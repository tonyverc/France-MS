import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //  Récupérer le token depuis localStorage
    const token = localStorage.getItem('token');
    
    //  Cloner la requête et ajouter le token si disponible
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    //  Gérer les erreurs 401 (non autorisé)
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token invalide ou expiré, on déconnecte l'utilisateur
          localStorage.removeItem('token');
          localStorage.removeItem('admin');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}