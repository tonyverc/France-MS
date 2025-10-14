import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface Admin {
  id: number;
  nom: string;
  email: string;
  roles: string[];
}

export interface LoginResponse {
  id: number;
  nom: string;
  email: string;
  roles: string[];
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private apiUrl = 'http://127.0.0.1:8000/api/admin/custom-login';

  // BehaviorSubject stocke l'admin connecté
  private currentAdminSubject = new BehaviorSubject<Admin | null>(null);
  public currentAdmin$: Observable<Admin | null> = this.currentAdminSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Au démarrage, on charge l'admin depuis localStorage si disponible
    const storedAdmin = localStorage.getItem('admin');
    const storedToken = localStorage.getItem('token');
        
    if (storedAdmin && storedToken) {
      try {
        const admin = JSON.parse(storedAdmin);
        this.currentAdminSubject.next(admin);
      } catch (e) {
        this.clearStorage();
      }
    }
  }

  // ✅ Méthode de connexion corrigée
  login(nom: string, email: string, password: string): Observable<LoginResponse> {
    
    return this.http.post<LoginResponse>(this.apiUrl, { nom, email, password }).pipe(
      tap((response) => {
        
        // ✅ Stocker le token
        localStorage.setItem('token', response.token);
        
        // ✅ Créer l'objet Admin (sans le token ni le password)
        const admin: Admin = {
          id: response.id,
          nom: response.nom,
          email: response.email,
          roles: response.roles
        };
        
        // ✅ Stocker l'admin en JSON
        const adminJson = JSON.stringify(admin);
        localStorage.setItem('admin', adminJson);
        
        // ✅ Mettre à jour le BehaviorSubject
        this.currentAdminSubject.next(admin);
      })
    );
  }

  logout(): void {
    this.clearStorage();
    this.currentAdminSubject.next(null);
    this.router.navigate(['/login']);
  }

  private clearStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  }

  getCurrentAdmin(): Admin | null {
    return this.currentAdminSubject.value;
  }

  getAdminNom(): string {
    const admin = this.currentAdminSubject.value;
    return admin ? admin.nom : '';
  }

  isLoggedIn(): boolean {
    const hasToken = !!localStorage.getItem('token');
    const hasAdmin = !!localStorage.getItem('admin');
    return hasToken && hasAdmin;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}