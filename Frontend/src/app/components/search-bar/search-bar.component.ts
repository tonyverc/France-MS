import { Component, OnInit, OnDestroy, HostListener, NgModule } from '@angular/core';
import { SearchService, SearchResults } from '../../services/search.service.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchQuery = '';
  results: SearchResults | null = null;
  loading = false;
  showResults = false;
  private destroy$ = new Subject<void>();

  constructor(
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchService.getSearchObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          this.results = results;
          this.loading = false;
          this.showResults = true;
        },
        error: (error) => {
          console.error('Erreur de recherche:', error);
          this.loading = false;
        }
      });
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;

    if (this.searchQuery.length < 2) {
      this.results = null;
      this.showResults = false;
      return;
    }

    this.loading = true;
    this.searchService.updateSearchTerm(this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.results = null;
    this.showResults = false;
  }

  navigateTo(type: string, id: number): void {
    this.showResults = false;
    this.clearSearch();
    this.router.navigate([`/${type}`, id]);
  }

  getTotalResults(): number {
    return this.results?.total || 0;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-container')) {
      this.showResults = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}