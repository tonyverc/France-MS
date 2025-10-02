import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-produits',
  imports: [RouterModule, CommonModule],
  templateUrl: './card-produits.component.html',
  styleUrls: ['./card-produits.component.css']
})
export class CardProduitsComponent {
  @Input() imageUrl: string = '';
  @Input() description: string = '';
  @Input() link?: any; // optionnel, peut être un string ou un tableau pour routerLink
  @Input() buttonText:string = 'Voir les produits';
}
