
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, of } from 'rxjs';
import { Produit, SousCategorie } from '../models/produits.model';

export interface Categorie {
  id: number;
  nom: string;
}

@Injectable({ providedIn: 'root' })
export class ProduitService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  private categorieActive = new BehaviorSubject<number | null>(null);
  private sousCategorieActive = new BehaviorSubject<number | null>(null);
  private produits$ = new BehaviorSubject<Produit[]>([]);

  constructor(private http: HttpClient) {
    // Met à jour automatiquement les produits selon la catégorie/sous-catégorie
    this.sousCategorieActive.pipe(
      switchMap((sousCatId) =>
        sousCatId
          ? this.getProduitsBySousCategorie(sousCatId)
          : this.categorieActive.value
          ? this.getProduitsCategorie(this.categorieActive.value)
          : of([])
      )
    ).subscribe((produits) => this.produits$.next(produits));
  }

  // --- API appels --- //
  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/categories`);
  }

  getSousCategories(categorieId: number ,): Observable<SousCategorie[]> {
    return this.http.get<SousCategorie[]>(`${this.apiUrl}/categories/${categorieId}/souscategories`);
  }

  getProduitsCategorie(categorieId: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/categories/${categorieId}/produits`);
  }

  getProduitsBySousCategorie(sousCategorieId: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/souscategories/${sousCategorieId}/produits`);
  }
  getSousCategorieById(id: number): Observable<{id: number, nom: string, categorie: string}> {
    return this.http.get<{id: number, nom: string, categorie: string}>(`${this.apiUrl}/souscategories/${id}`);
  }

  // --- États réactifs --- //
  setCategorieActive(id: number) {
    this.categorieActive.next(id);
    this.sousCategorieActive.next(null); // reset sous-catégorie
  }

  setSousCategorieActive(id: number) {
    this.sousCategorieActive.next(id);
  }

  getProduits$(): Observable<Produit[]> {
    return this.produits$.asObservable();
  }
}

