import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie, Produit } from '../models/produits.model';
@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = 'http://localhost:8000/api/categorie/';

  constructor(private http: HttpClient) {}

  // Récupère toutes les catégories et leurs sous-catégories
  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl);
  }

  // Récupère une sous-catégorie spécifique avec ses produits
  getProduitsBySousCategorie(sousCategorieId: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}?sous_categorie=${sousCategorieId}`);
  }
}