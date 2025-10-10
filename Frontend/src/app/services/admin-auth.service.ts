import { HttpClient, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
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

  private apiUrl = 'http://127.0.0.1:8000/api/admin/login';

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

login(email: string, password: string): Observable<any> {
  return this.http.post<{ token: string, nom: string, email: string }>(this.apiUrl, { email, password }).pipe(
    tap((res) => {
      localStorage.setItem('admin', JSON.stringify({ nom: res.nom, email: res.email }));
      localStorage.setItem('token', res.token);
      this.currentAdminSubject.next({ nom: res.nom, email: res.email, password: '' });
    })
  );
}

  logout() {
    localStorage.removeItem('admin');
    this.currentAdminSubject.next(null);
  }

  getcurrentAdminValue(): Admin | null {
    return this.currentAdminSubject.value;
  }
}
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}