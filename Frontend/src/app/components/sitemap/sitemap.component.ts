import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sitemap',
  imports: [RouterLink, CommonModule],
  templateUrl: './sitemap.component.html',
  styleUrl: './sitemap.component.css'
})
export class SitemapComponent {

  // Tableau réprensentant la structure pour le plan du site
  menuSitemap = [
    { label: 'Accueil', link: '/accueil' },
    
    { label: 'Lubrifiants', sub: [
      { label: 'Huile moteur', link: '/huile-moteur' },
      { label: 'Huile transmission', link: '/huile-transmission' }
    ], link: '/lubrifiants' },
    
    { label: 'Graisses', sub: [
      { label: 'Graisse moteur', link: '/graisse-moteur' },
      { label: 'Graisse transmission', link: '/graisse-transmission' }
    ], link: '/graisses' },
    
    { label: 'Filtrations', sub: [
      { label: 'Filtre moteur', link: '/filtre-moteur' },
      { label: 'Filtre transmission', link: '/filtre-transmission' }
    ], link: '/filtrations' },
    
    { label: 'Contact', link: '/contact' },

    { label: 'Mentions légales', link: '/mentions-legales' },
    
    { label: 'Plan du site', link: '/plan-du-site' },

    { label: 'Connexion Admin', link: '/login' }
  ];

}
