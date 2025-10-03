import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private apiUrl = 'http://127.0.0.1:8000/api/admin';

  constructor(private http: HttpClient) {}

  login( nom: string, email: string, password:string): Observable<any> {
    return this.http.post(this.apiUrl, { nom, email, password });
  }
}
