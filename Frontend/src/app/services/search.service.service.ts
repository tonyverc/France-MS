import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

export interface SearchResults {
  results: {
    products?: any[];
  };
  total: number;
  query: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://127.0.0.1:8000/api/search';
  private searchTerms = new Subject<string>();

  constructor(private http: HttpClient) {}

  search(term: string): Observable<SearchResults> {
    return this.http.get<SearchResults>(this.apiUrl, {
      params: { q: term }
    });
  }

  // Pour la recherche avec debounce
  getSearchObservable(): Observable<SearchResults> {
    return this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.search(term))
    );
  }

  updateSearchTerm(term: string): void {
    this.searchTerms.next(term);
  }
}