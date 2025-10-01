import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IconComponent, RouterLink ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  menuItems = [
    { label: 'Accueil', icon: 'home', path: '/' },
    { label: 'Produits', icon: 'box', path: '/produits' },
    { label: 'Lubrifiants', icon: 'droplet', sub: ['Huile moteur', 'Huile transmission'], path: '/lubrifiants' },
    { label: 'Graisses', icon: 'engrenage', sub: ['Graisse moteur', 'Graisse transmission'], path: '/graisses' },
    { label: 'Filtrations', icon: 'funnel', sub: ['Filtre moteur', 'Filtre transmission'], path: '/filtrations' },
    { label: 'Contact', icon: 'contact', path: '/contact' }
  ];

 
}
