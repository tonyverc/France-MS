import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProduitService, Categorie } from '../../services/produits.service';
import { SousCategorie } from '../../models/produits.model';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  categories: Categorie[] = [];
  sousCategories: SousCategorie[] = [];
  selectedCategorieId: number | null = null;
  sousCategoriesMap: { [categorieId: number]: SousCategorie[] } = {};

  constructor(private produitService: ProduitService, private router: Router) {}

  ngOnInit(): void {
    this.produitService.getCategories().subscribe({
      next: (data) => (this.categories = data),
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


selectCategorie(categorieId: number) {
  console.log('Catégorie sélectionnée ID :', categorieId);
  
  this.selectedCategorieId = categorieId;

  const catExists = this.categories.find(cat => cat.id === categorieId);
  if (!catExists) {
    console.error(`Catégorie avec ID ${categorieId} non trouvée.`);
    return;
  }
  
  if (!this.sousCategoriesMap[categorieId]) {
    this.produitService.getSousCategories(categorieId).subscribe({
      next: (data) => {
        this.sousCategoriesMap[categorieId] = data;
      },
      error: err => console.error(err)
    });
  }
}
selectSousCategorie(sousCategorieId: number) {
  console.log('Sous-catégorie sélectionnée ID :', sousCategorieId);
  this.produitService.setSousCategorieActive(sousCategorieId);
}}
