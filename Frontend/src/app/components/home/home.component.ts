import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CardProduitsComponent } from '../card-produits/card-produits.component';
import { ProduitService } from '../../services/produits.service';
import { Categorie, Produit } from '../../models/produits.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardProduitsComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  produits: Produit[] = [];
  produitsFiltres: Produit[] = [];
  categories: Categorie[] = [];

  // Texte statique de la homepage
  title: string = 'A propos de nous.';
  Description: string =
    'France Marine Services est spécialisée dans la fourniture de lubrifiants, graisses et solutions de filtration destinées aux péniches et à la navigation intérieure.';
  videoTitle: string = 'Bienvenue chez France Marine Services';
  videoDescription: string =
    'La performance et la fiabilité au service de vos péniches.';
  img1: string = 'assets/images/peniche-2.jpg';
  img2: string = 'assets/images/peniche-lyonnaise.jpg';

  // Associer les images/texte aux catégories → basé sur l'ordre renvoyé par l’API
  cardContent = [
    {
      imageUrl: 'assets/images/huile.jpg',
      description:
        'Nos huiles marines sont spécialement conçues pour répondre aux exigences des moteurs marins.',
      link: 'Voir nos huiles',
    },
    {
      imageUrl: 'assets/images/graisse-marine.webp',
      description:
        'Nos graisses marines assurent une protection durable contre l’usure et la corrosion.',
      link: 'Voir nos graisses',
    },
    {
      imageUrl: 'assets/images/filtres.jpg',
      description:
        'Nos filtres marins assurent une protection optimale des moteurs et systèmes hydrauliques.',
      link: 'Voir nos filtres',
    },
  ];

  constructor(private produitsService: ProduitService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.produitsService.getCategories().subscribe({
      next: (data) => {
        // On suppose que l’API renvoie [lubrifiants, graisses, filtres]
        this.categories = data.map((cat, index) => ({
          ...cat,
          imageUrl: this.cardContent[index]?.imageUrl || '',
          description: this.cardContent[index]?.description || '',
          link: this.cardContent[index]?.link || '',
        }));
      },
      error: (err) => {
        console.error('Erreur récupération catégories :', err);
        alert('Impossible de récupérer les catégories.');
      },
    });
  }

  selectCategorieApi(categorieId: number) {
    this.produitsService.getProduitsCategorie(categorieId).subscribe({
      next: (data: Produit[]) => {
        this.produits = data;
        this.produitsFiltres = data;
      },
      error: (err) => {
        console.error('Erreur récupération produits :', err);
        alert('Impossible de récupérer les produits pour cette catégorie.');
      },
    });
  }
}
