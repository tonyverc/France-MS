import { Produit, SousCategorie } from './../../models/produits.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { RouterLink } from '@angular/router';
import { Categorie } from '../../models/produits.model';
import { ProduitService } from '../../services/produits.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IconComponent, RouterLink ],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  produitsAffiches : Produit[] = [];
  categories: Categorie[] = [];
  sousCategories: SousCategorie[] = [];
  selectCategorieId: number | null = null;
  selectSousCategorieId: number | null = null;
  sousCategoriesMap: { [categorieId: number]: SousCategorie[] } = {};

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  //recuperer les categories
  loadCategories() {
    this.produitService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories.map((cat) => ({
          ...cat,
          icon: this.getIconForCategory(cat.nom) // Associer une icône basée sur le nom de la catégorie
        }));
      },
      error: (err) => console.error('Erreur récupération catégories :', err),
    });
  }


  // Associer une icône à chaque catégorie basée sur son nom
  getIconForCategory(nom: string): string {
    switch (nom.toLowerCase()) {
      case 'lubrifiants': return 'droplet';
      case 'graisses' : return 'engrenage';
      case 'filtrations' : return 'funnel';
      default: return 'folder';
    }
  }

  // recuperer les sous-categories au clique d'une categorie
  selectCategorie(categorieId: number) {
    this.selectCategorieId = categorieId;
    this.selectSousCategorieId = null; // Réinitialiser la sous-catégorie sélectionnée
    this.produitService.getSousCategories(categorieId).subscribe({
      next: (sousCategories) => {
        this.sousCategories = sousCategories;
      },
      error: (err) => console.error('Erreur récupération sous-catégories :', err),
    });
  }

  // Sélection d'une sous-catégorie
  selectSousCategorie(sousCategorieId: number) {
    this.selectSousCategorieId = sousCategorieId;
    this.produitService.getProduitsBySousCategorie(sousCategorieId).subscribe({
      next: produits => this.produitsAffiches = produits,
      error: err => console.error('Erreur produits sous-catégorie :', err)
    });
  }

  //récuperer les produits d'une sous-catégorie
  produitsBySousCategorie(sousCategorieId: number) {
    this.produitService.getProduitsBySousCategorie(sousCategorieId).subscribe({
      next: (produits) => {
        console.log(produits);
      },
      error: (err) => console.error('Erreur récupération produits sous-catégorie :', err),
    });

 
}
}
