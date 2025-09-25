import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   searchTerm: string = '';

  menus = [
    { title: 'Accueil', icon: 'home', link: '/' },
    { 
      title: 'Lubrifiants', 
      icon: 'droplet', 
      sub: ['huile moteur','huile transmission'] 
    },
    { 
      title: 'Graisses', 
      icon: 'cog6', 
      sub: ['graisse moteur','graisse transmission'] 
    },
    { 
      title: 'Filtrations', 
      icon: 'funnel', 
      sub: ['filtre moteur','filtre transmission'] 
    },
  ];

  login() {
    console.log('Connexion Administration');
    // ici tu peux gérer la redirection ou l'ouverture du modal
  }
}
