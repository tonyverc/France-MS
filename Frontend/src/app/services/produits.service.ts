import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produits.model';

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

  getProduitsCategorie(categorieId: number) {
    return this.http.get<Produit[]>(`${this.apiUrl}/categories/${categorieId}/produits`);
  }

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/categories`); // ou /categorie selon ton backend
  }
}
