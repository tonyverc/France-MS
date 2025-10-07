import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit, SousCategorie } from '../models/produits.model';

export interface Categorie {
  id: number;
  nom: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Récupérer les produits d'une catégorie spécifique
  getProduitsCategorie(categorieId: number) {
    return this.http.get<Produit[]>(`${this.apiUrl}/categories/${categorieId}/produits`);
  }

  // Récupérer toutes les catégories
  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/categories`); 
  }

  // récupérer les sous-catégories d'une catégorie spécifique
  getSousCategories(categorieId: number) : Observable<SousCategorie[]> {
    return this.http.get<SousCategorie[]>(`${this.apiUrl}/categories/${categorieId}/souscategories`);
  }

  // récupérer les produits d'une sous-catégorie spécifique
  getProduitsBySousCategorie(sousCategorieId: number) : Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/souscategories/${sousCategorieId}/produits`);
  }

}
