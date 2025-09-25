import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-produits',
  imports: [CommonModule],
  templateUrl: './card-produits.component.html',
  styleUrl: './card-produits.component.css'
})
export class CardProduitsComponent {

  @Input() imageUrl: string = '';
  @Input() description: string = '';
  @Input() link: string = '';
}
