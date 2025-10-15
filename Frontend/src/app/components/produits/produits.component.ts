import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProduitService } from '../../services/produits.service';
import { Produit, SousCategorie } from '../../models/produits.model';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produits.component.html',
})
export class ProduitsComponent implements OnInit {
  // Mode d'affichage
  displayMode: 'list' | 'detail' = 'list';
  
  // Liste
  produits: Produit[] = [];
  produitsPage: Produit[] = [];
  sousCategories: SousCategorie[] = [];
  categorieId!: number;
  categorieSlug!: string;
  categorieNom!: string;
  sousCategorieNom!: string;
  currentPage = 1;
  pageSize = 8;
  totalPages = 1;
  
  // Détail
  produitDetail: Produit | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    // Écoute des changements d'URL
    this.route.paramMap.subscribe(params => {
      const idFromUrl = Number(params.get('id'));
      const url = this.router.url;
      
      // Déterminer le mode en fonction de l'URL
      const isSousCat = url.includes('/souscategorie/');
      const isCategorie = url.includes('/categories/');
      const isProduitDetail = url.startsWith('/produits/') && !isSousCat && !isCategorie;

      if (isProduitDetail) {
        // Mode détail produit
        this.displayMode = 'detail';
        this.loadProduitById(idFromUrl);
      } else if (isSousCat) {
        // Mode liste par sous-catégorie
        this.displayMode = 'list';
        this.loadProduitsBySousCategorie(idFromUrl);
      } else if (isCategorie) {
        // Mode liste par catégorie
        this.displayMode = 'list';
        this.loadProduitsByCategorie(idFromUrl);
      }
    });
  }

  // Produit par ID (pour le mode détail)
  private loadProduitById(id: number): void {
    this.produitService.getById(id).subscribe({
      next: produit => {
        // Préfixer les URLs
        this.produitDetail = {
          ...produit,
          image: produit.image 
            ? (produit.image.startsWith('http') ? produit.image : `http://127.0.0.1:8000/uploads/images/${produit.image}`)
            : '',
          fiche_technique: produit.fiche_technique 
            ? (produit.fiche_technique.startsWith('http') 
                ? produit.fiche_technique 
                : `http://127.0.0.1:8000/uploads/fiches_techniques/${produit.fiche_technique}`)
            : ''
        };
      },
      error: err => {
        console.error('Erreur chargement produit:', err);
        // Rediriger vers la page d'accueil si produit introuvable
        this.router.navigate(['/']);
      }
    });
  }

  // Produits par sous-catégorie
  private loadProduitsBySousCategorie(sousCatId: number): void {
    this.produitService.getProduitsBySousCategorie(sousCatId).subscribe({
      next: produits => this.initProduits(produits)
    });

    // Récupère le nom de la sous-catégorie et sa catégorie parente
    this.produitService.getSousCategorieById(sousCatId).subscribe({
      next: sc => {
        this.sousCategorieNom = sc.nom ?? 'Sous-catégorie';
        this.categorieNom = sc.categorie ?? 'Catégorie';
      }
    });
  }

  // Produits par catégorie
  private loadProduitsByCategorie(categorieId: number): void {
    this.categorieId = categorieId;

    // Produits
    this.produitService.getProduitsCategorie(this.categorieId).subscribe({
      next: produits => this.initProduits(produits)
    });

    // Sous-catégories pour filtre/menu
    this.produitService.getSousCategories(this.categorieId).subscribe({
      next: data => this.sousCategories = data
    });

    // Nom de la catégorie
    this.produitService.getCategories().subscribe({
      next: cats => {
        const cat = cats.find(c => c.id === this.categorieId);
        this.categorieNom = cat ? cat.nom : 'Catégorie';
      }
    });
  }

  // Pagination + recuperation image et fiche technique du produit
  private initProduits(produits: Produit[]): void {
    // Préfixe les URLs des images et fiches techniques
    this.produits = produits.map(p => ({
      ...p,
      image: p.image 
        ? (p.image.startsWith('http') ? p.image : `http://127.0.0.1:8000/uploads/images/${p.image}`)
        : '',
      fiche_technique: p.fiche_technique 
        ? (p.fiche_technique.startsWith('http') 
            ? p.fiche_technique 
            : `http://127.0.0.1:8000/uploads/fiches_techniques/${p.fiche_technique}`)
        : ''
    }));
    this.totalPages = Math.ceil(this.produits.length / this.pageSize);
    this.setPage(1);
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    this.produitsPage = this.produits.slice(start, start + this.pageSize);
  }

  // Navigation vers le détail
  viewDetail(id: number): void {
    this.router.navigate(['/produits', id]);
  }

  // Retour à la liste (depuis le détail)
  backToList(): void {
    // Si on a un categorieId en mémoire, retourner à cette catégorie
    if (this.categorieId) {
      this.router.navigate(['/produits/categories', this.categorieId]);
    } else if (this.produitDetail?.sousCategories?.id) {
      // Sinon essayer via la sous-catégorie du produit
      this.router.navigate(['/produits/souscategorie', this.produitDetail.sousCategories.id]);
    } else {
      // Par défaut, aller à l'accueil
      this.router.navigate(['/']);
    }
  }

  // Sélection depuis navbar
  selectSousCategorie(id: number): void {
    this.produitService.setSousCategorieActive(id);
  }

  // Télécharger la fiche technique
  downloadFiche(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}