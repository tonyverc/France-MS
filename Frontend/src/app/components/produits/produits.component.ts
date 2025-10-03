import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProduitService } from '../../services/produits.service';
import { Categorie, Produit } from '../../models/produits.model';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css',
})
export class ProduitsComponent implements OnInit {
  produits: Produit[] = [];
  produitsPage: Produit[] = [];
  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 5;
  categorieId!: number;
  categorieNom!: string;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService
  ) {}

  // Charger le nom de la catégorie
  loadCategorie() {
    this.produitService.getCategories().subscribe({
      next: (categories) => {
        const cat = categories.find((c) => c.id === this.categorieId);
        if (cat) {
          this.categorieNom = cat.nom;
        }
      },
      error: (err) => console.error('Erreur récupération catégorie :', err),
    });
  }

  // Charger les produits de la catégorie
  loadProduits() {
    this.produitService.getProduitsCategorie(this.categorieId).subscribe({
      next: (produits) => {
        this.produits = produits;
        this.totalPages = Math.ceil(produits.length / this.pageSize);
        this.setPage(1); // initialise la pagination
      },
      error: (err) => console.error('Erreur récupération produits :', err),
    });
  }

  // Gestion pagination
  setPage(page: number) {
    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    this.produitsPage = this.produits.slice(start, start + this.pageSize);
  }

  ngOnInit(): void {
    this.categorieId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduits();
    this.loadCategorie();
  }
}
