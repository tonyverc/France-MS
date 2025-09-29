import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  adresse:string = `FRANCE MARINE SERVICES ,
  7 R des sources, lot le moulin, 
  62112 GOUY-SOUS-BELLONNE`;

  information:string = "Besoin d'informations ? Contactez-nous !";
  aMention:string = 'Mentions légales';
  aPlan:string = 'Plan du site';
  contact:string = 'Nous contacter';
  
  // mise a jour de la date du copyright dynamique
  currentYear: number = new Date().getFullYear();
  

}
