import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../services/produits.service';
import { Produit } from '../../models/produits.model';


@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitComponent implements OnInit {
  @Input() sousCategorieId!: number;  // On reçoit l’ID de la sous-catégorie depuis le parent
  produits: Produit[] = [];
  loading = false;

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    if (this.sousCategorieId) {
      this.loadProduits();
    }
  }

  loadProduits(): void {
    this.loading = true;
    this.produitService.getProduitsBySousCategorie(this.sousCategorieId).subscribe({
      next: (data) => {
        this.produits = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
