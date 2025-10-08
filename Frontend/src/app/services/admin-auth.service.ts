import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface Admin {
  nom: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private apiUrl = 'http://127.0.0.1:8000/api/admin';

 // BehaviorSubject stocke l'admin connecté
  private currentAdminSubject = new BehaviorSubject<Admin | null>(null);
  public currentAdmin$: Observable<Admin | null> = this.currentAdminSubject.asObservable();

  constructor(private http: HttpClient) {
    // Au démarrage, on charge l'admin depuis localStorage si disponible
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      this.currentAdminSubject.next(JSON.parse(storedAdmin));
    }
  }

  login(nom: string, email: string, password: string): Observable<Admin> {
    return this.http.post<Admin>(this.apiUrl, { nom, email, password }).pipe(
      tap((admin) => {
        // Stocke l'admin connecté localement
        localStorage.setItem('admin', JSON.stringify(admin));
        this.currentAdminSubject.next(admin);
      })
    );
  }

  logout() {
    localStorage.removeItem('admin');
    this.currentAdminSubject.next(null);
  }

  get currentAdminValue(): Admin | null {
    return this.currentAdminSubject.value;
  }
}
