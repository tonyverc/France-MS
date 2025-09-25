import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  menuItems = [
    { label: 'Accueil', icon: 'home' },
    { label: 'Lubrifiants', icon: 'droplet', sub: ['Huile moteur', 'Huile transmission'] },
    { label: 'Graisses', icon: 'engrenage', sub: ['Graisse moteur', 'Graisse transmission'] },
    { label: 'Filtrations', icon: 'funnel', sub: ['Filtre moteur', 'Filtre transmission'] },
    { label: 'Contact', icon: 'contact'}
  ];

  login() {
    console.log('Connexion…');
  }
}
