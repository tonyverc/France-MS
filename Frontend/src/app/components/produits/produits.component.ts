import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProduitService } from '../../services/produits.service';
import { Produit, SousCategorie } from '../../models/produits.model';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produits.component.html',
})
export class ProduitsComponent implements OnInit {
  produits: Produit[] = [];
  produitsPage: Produit[] = [];
  sousCategories: SousCategorie[] = [];
  categorieId!: number;
  categorieNom!: string;
  sousCategorieNom! : string;
  currentPage = 1;
  pageSize = 8;
  totalPages = 1;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    //  On écoute les changements d’ID dans l’URL
    this.route.paramMap.subscribe(params => {
      const idFromUrl = Number(params.get('id'));
      const isSousCat = this.route.snapshot.url.some(seg => seg.path === 'souscategorie');

      if (isSousCat) {
        //  Produits liés à une sous-catégorie
        this.loadProduitsBySousCategorie(idFromUrl);
      } else {
        //  Produits liés à une catégorie
        this.loadProduitsByCategorie(idFromUrl);
      }
    });
  }

  //  Chargement des produits d’une sous-catégorie
  private loadProduitsBySousCategorie(id: number): void {
    this.produitService.getProduitsBySousCategorie(id).subscribe({
      next: produits => this.initProduits(produits)
    });

    // Récupère le nom de la catégorie associée à cette sous-catégorie
    this.produitService.getSousCategorieById(id).subscribe({
      next: sc => this.categorieNom = sc.categorie ?? 'Catégorie'
    });
  }
  //  Chargement des produits d’une catégorie
  private loadProduitsByCategorie(id: number): void {
    this.categorieId = id;

    this.produitService.getProduitsCategorie(this.categorieId).subscribe({
      next: produits => this.initProduits(produits)
    });

    this.produitService.getSousCategories(this.categorieId).subscribe({
      next: data => this.sousCategories = data
    });

    this.produitService.getCategories().subscribe({
      next: cats => {
        const cat = cats.find(c => c.id === this.categorieId);
        this.categorieNom = cat ? cat.nom : 'Catégorie';
      }
    });
  }

  //  Initialise la pagination
  private initProduits(produits: Produit[]): void {
    this.produits = produits;
    this.totalPages = Math.ceil(this.produits.length / this.pageSize);
    this.setPage(1);
  }

  //  Pagination
  setPage(page: number): void {
    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    this.produitsPage = this.produits.slice(start, start + this.pageSize);
  }

  //  Lorsqu’on sélectionne une sous-catégorie (depuis la navbar)
  selectSousCategorie(id: number): void {
    this.produitService.setSousCategorieActive(id);
  }

  // chemin pour récuperer et afficher la fiche technique
  getFicheTechniqueUrl(fichier: string): string {
  return `http://127.0.0.1:8000/uploads/fiches_techniques/${fichier}`;
  }

// chemin pour récuperer et afficher l'image du produit
  getImageUrl(filename: string): string {
    return `http://127.0.0.1:8000/uploads/images/${filename}`;
  }
}
