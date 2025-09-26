import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
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

}
