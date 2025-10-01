import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CardProduitsComponent } from '../card-produits/card-produits.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardProduitsComponent,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  // Création d'un tableau d'objets pour les card produit de la homepage
  cards = [
    { imageUrl: 'assets/images/huile.jpg', description: 'Nos huiles marines sont spécialement conçues pour répondre aux exigences des moteurs de bateaux et péniches. Elles garantissent une lubrification optimale, réduisent l’usure et prolongent la durée de vie des équipements, même dans les conditions les plus exigeantes de la navigation fluviale.', link: 'Voir nos huiles' },
    { imageUrl: 'assets/images/graisse-marine.webp', description: 'Nos graisses marines assurent une protection durable contre l’usure et la corrosion, même en milieu humide. Idéales pour les péniches et équipements fluviaux, elles garantissent fiabilité et longévité à vos installations.', link: 'Voir nos graisses' },
    { imageUrl: 'assets/images/filtres.jpg', description: 'Nos filtres marins assurent une protection optimale des moteurs et systèmes hydrauliques des péniches. Ils garantissent une filtration efficace des impuretés pour préserver les performances et prolonger la durée de vie de vos équipements en milieu fluvial.', link: 'Voir nos filtres' },
  ]

  title:string = 'A propos de nous.';
  Description:string = 'France Marine Services est spécialisée dans la fourniture de lubrifiants, graisses et solutions de filtration destinées aux péniches et à la navigation intérieure. Notre mission est d’accompagner les professionnels du fluvial avec des produits fiables, adaptés aux exigences des moteurs et équipements, afin de garantir performance, sécurité et longévité.';
  videoTitle:string ='Bienvenue chez France Marine Services';
  videoDescription:string = 'la performance et la fiabilité au service de vos péniches.';
  img1:string ='assets/images/peniche-2.jpg';
  img2:string = 'assets/images/peniche-lyonnaise.jpg';
  
}
