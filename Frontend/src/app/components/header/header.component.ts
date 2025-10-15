import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProduitService, Categorie } from '../../services/produits.service';
import { SousCategorie } from '../../models/produits.model';
import { IconComponent } from '../icon/icon.component';
import { forkJoin } from 'rxjs';
import { AdminAuthService } from '../../services/admin-auth.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, SearchBarComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  categories: Categorie[] = [];
  sousCategories: SousCategorie[] = [];
  selectedCategorieId: number | null = null;
  sousCategoriesMap: { [categorieId: number]: SousCategorie[] } = {};
  user: any = null;

  constructor(
    private produitService: ProduitService,
    private router: Router,
    private authService: AdminAuthService
  ) {}

  ngOnInit(): void {
    // Récupération des catégories et sous-catégories
    this.produitService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;

        // On prépare les requêtes pour chaque catégorie
        const sousCatRequests = categories.map((cat) =>
          this.produitService.getSousCategories(cat.id)
        );

        // On exécute toutes les requêtes en parallèle
        forkJoin(sousCatRequests).subscribe({
          next: (allSousCats) => {
            allSousCats.forEach((sousCats, index) => {
              const catId = categories[index].id;
              this.sousCategoriesMap[catId] = sousCats;
            });
          },
          error: (err) => console.error('Erreur sous-catégories', err),
        });
      },
      error: (err) => console.error('Erreur catégories', err),
    });

    // Récupération de l'utilisateur connecté
    this.authService.currentAdmin$.subscribe((user) => {      
      this.user = user;
    });
  }

  redirectToEasy(): void {
    window.location.href = 'http://localhost:8000/admin/';
  }

  // Deconnexion de l'admin
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // gestion du menu burger pour le mobile
  isMenuOpen = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  closeMenu() {
    this.isMenuOpen = false;
  }

  // Associer une icône à chaque catégorie basée sur son nom
  getIconForCategory(nom: string): string {
    switch (nom.toLowerCase()) {
      case 'lubrifiants':
        return 'droplet';
      case 'graisses':
        return 'engrenage';
      case 'filtrations':
        return 'funnel';
      default:
        return 'folder';
    }
  }

  selectCategorie(categorieId: number) {
    this.selectedCategorieId = categorieId;

    const catExists = this.categories.find((cat) => cat.id === categorieId);
    if (!catExists) {
      return;
    }

    if (!this.sousCategoriesMap[categorieId]) {
      this.produitService.getSousCategories(categorieId).subscribe({
        next: (data) => {
          this.sousCategoriesMap[categorieId] = data;
        },
        error: (err) => console.error(err),
      });
    }
  }
  selectSousCategorie(sousCategorieId: number) {
    this.produitService.setSousCategorieActive(sousCategorieId);
  }
}
