import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProduitService } from '../../services/produits.service';
import { Categorie } from '../../models/produits.model';
import { Router, RouterModule } from '@angular/router';
import { CardProduitsComponent } from '../card-produits/card-produits.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CardProduitsComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  categories: Categorie[] = [];

  cardContent = [
    { imageUrl: 'assets/images/huile.jpg', link: 'Voir nos huiles', description: 'Découvrez notre gamme d\'huiles pour moteurs marins.' },
    { imageUrl: 'assets/images/graisse-marine.webp', link: 'Voir nos graisses', description: 'Graisses marines haute performance pour la navigation.' },
    { imageUrl: 'assets/images/filtres.jpg', link: 'Voir nos filtres', description: 'Filtres de qualité pour la protection de vos moteurs.' },
  ];

    videoTitle = 'Bienvenue chez France Marine Services';
    videoDescription = 'La performance et la fiabilité au service de vos péniches.';
    img1 = 'assets/images/peniche-2.jpg';
    img2 = 'assets/images/peniche-lyonnaise.jpg';
    title = 'A propos de nous.';
    description = 'France Marine Services est spécialisée dans la fourniture de lubrifiants, graisses et solutions de filtration destinées aux péniches et à la navigation intérieure.';

  constructor(private produitsService: ProduitService, private router: Router) {}

ngOnInit() {
  this.produitsService.getCategories().subscribe({
    next: (data) => {
      this.categories = data.map((cat, index) => ({
        ...cat,
        imageUrl: this.cardContent[index]?.imageUrl || '',
        description: this.cardContent[index]?.description || '',
        link: `/produits/${cat.id}`,  // routing vers ProduitsComponent
      }));
    },
  });
}

  selectCategorie(categorieId: number) {
    this.produitsService.setCategorieActive(categorieId);
    this.router.navigate(['/produits', categorieId]);
  }

}
