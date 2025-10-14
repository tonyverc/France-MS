import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-politique-confidentialite',
  imports: [RouterLink],
  templateUrl: './politique-confidentialite.component.html',
  styleUrl: './politique-confidentialite.component.css'
})
export class PolitiqueConfidentialiteComponent {
email: string = 'contact@votre-domaine.com';
}
