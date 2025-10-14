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
  categorieSlug!: string;
  categorieNom!: string;
  sousCategorieNom!: string;
  currentPage = 1;
  pageSize = 8;
  totalPages = 1;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    // Écoute des changements d'URL
    this.route.paramMap.subscribe(params => {
      const idFromUrl = Number(params.get('id'));
      const isSousCat = this.route.snapshot.url.some(seg => seg.path === 'souscategorie');

      if (isSousCat) {
        this.loadProduitsBySousCategorie(idFromUrl);
      } else {
        this.loadProduitsByCategorie(idFromUrl);
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

  // Sélection depuis navbar
  selectSousCategorie(id: number): void {
    this.produitService.setSousCategorieActive(id);
  }

}
