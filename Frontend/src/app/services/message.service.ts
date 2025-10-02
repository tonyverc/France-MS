import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://127.0.0.1:8000/api/message'; // endpoint POST Symfony

  constructor(private http: HttpClient) {}

  sendMessage(message: any): Observable<any> {
    return this.http.post(this.apiUrl, message);
  }
}
