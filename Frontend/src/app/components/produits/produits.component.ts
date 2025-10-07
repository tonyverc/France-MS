import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProduitService } from '../../services/produits.service';
import { Produit, SousCategorie, Categorie } from '../../models/produits.model';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit {
  // Produits à afficher
  produits: Produit[] = [];
  produitsPage: Produit[] = [];

  // Sous-catégories
  sousCategories: SousCategorie[] = [];
  selectedSousCategorieId!: number;

  // Pagination
  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 1;

  // Catégorie
  categorieId!: number;
  categorieNom!: string;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    // Récupérer toutes les catégories pour trouver celle de l'URL
    this.produitService.getCategories().subscribe({
      next: (categories: Categorie[]) => {
        if (categories.length === 0) {
          console.warn('Aucune catégorie trouvée');
          return;
        }

        const idUrl = Number(this.route.snapshot.paramMap.get('id'));
        const cat = categories.find(c => c.id === idUrl) || categories[0];

        this.categorieId = cat.id;
        this.categorieNom = cat.nom;

        // Charger les sous-catégories et produits
        this.loadSousCategories();
      },
      error: (err) => console.error('Erreur récupération catégories :', err),
    });
  }

  // Charger les sous-catégories de la catégorie
  loadSousCategories() {
    this.produitService.getSousCategories(this.categorieId).subscribe({
      next: (sousCategories: SousCategorie[]) => {
        this.sousCategories = sousCategories;

        if (sousCategories.length > 0) {
          // Sélectionner par défaut la première sous-catégorie
          this.selectSousCategorie(sousCategories[0].id);
        } else {
          // Pas de sous-catégories => aucun produit
          this.produits = [];
          this.produitsPage = [];
        }
      },
      error: (err) => {
        console.warn(`Pas de sous-catégories pour la catégorie ${this.categorieId}`);
        this.produits = [];
        this.produitsPage = [];
      },
    });
  }

  // Sélectionner une sous-catégorie
  selectSousCategorie(sousCatId: number) {
    this.selectedSousCategorieId = sousCatId;
    console.log('Sous-catégorie sélectionnée :', sousCatId);
    
    this.getProduitsBySousCategorie(sousCatId);
  }

  // Récupérer les produits d'une sous-catégorie
getProduitsBySousCategorie(sousCatId: number) {
  this.produitService.getProduitsBySousCategorie(sousCatId).subscribe({
    next: (produits) => {
      this.produits = produits;
      this.totalPages = Math.ceil(produits.length / this.pageSize);
      this.setPage(1);
    },
    error: (err) => console.error('Erreur récupération produits de la sous-catégorie :', err)
  });
}
// Récupérer les produits de la catégorie 
  loadProduitsCategorie() {
  this.produitService.getProduitsCategorie(this.categorieId).subscribe({
    next: (produits) => {
      this.produits = produits;
      this.totalPages = Math.ceil(produits.length / this.pageSize);
      this.setPage(1);
    },
    error: (err) => console.error('Erreur récupération produits de la catégorie :', err)
  });
}


  // Pagination
  setPage(page: number) {
    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    this.produitsPage = this.produits.slice(start, start + this.pageSize);
  }
}
