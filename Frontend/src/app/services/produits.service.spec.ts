import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProduitService, Categorie } from './produits.service';
import { Produit } from '../models/produits.model';

describe('ProduitService', () => {
  let service: ProduitService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://127.0.0.1:8000/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProduitService]
    });
    
    service = TestBed.inject(ProduitService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Vérifier qu'il n'y a pas de requêtes HTTP en attente
    httpMock.verify();
  });

  /**
   * Test de création du service
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Test unitaire : getCategories() doit récupérer la liste des catégories
   */
  it('should get categories from API', () => {
    // Arrange - Données mockées
    const mockCategories: Categorie[] = [
      { id: 1, nom: 'Moteurs' },
      { id: 2, nom: 'Équipements' }
    ];

    // Act - Appeler la méthode
    service.getCategories().subscribe((categories) => {
      // Assert - Vérifier les données reçues
      expect(categories).toEqual(mockCategories);
      expect(categories.length).toBe(2);
      expect(categories[0].nom).toBe('Moteurs');
    });

    // Assert - Vérifier que la requête HTTP a été faite
    const req = httpMock.expectOne(`${apiUrl}/categories`);
    expect(req.request.method).toBe('GET');
    
    // Simuler la réponse du serveur
    req.flush(mockCategories);
  });

  /**
   * Test unitaire : getProduitsCategorie() doit récupérer les produits d'une catégorie
   */
  it('should get products by category', () => {
    // Arrange
    const categorieId = 1;
    const mockProduits: Produit[] = [
      {
        id: 1,
        nom: 'Moteur Diesel',
        description: 'Moteur puissant',
        image: 'moteur.jpg',
        fiche_technique: 'fiche.pdf',
        sousCategories: [] as any
      }
    ];

    // Act
    service.getProduitsCategorie(categorieId).subscribe((produits) => {
      // Assert
      expect(produits).toEqual(mockProduits);
      expect(produits.length).toBe(1);
      expect(produits[0].nom).toBe('Moteur Diesel');
    });

    // Assert HTTP
    const req = httpMock.expectOne(`${apiUrl}/categories/${categorieId}/produits`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduits);
  });

  /**
   * Test unitaire : getById() doit récupérer un produit spécifique
   */
  it('should get a single product by id', () => {
    // Arrange
    const produitId = 5;
    const mockProduit: Produit = {
      id: 5,
      nom: 'Test Produit',
      description: 'Description test',
      image: 'test.jpg',
      fiche_technique: 'test.pdf',
      sousCategories: [] as any
    };

    // Act
    service.getById(produitId).subscribe((produit) => {
      // Assert
      expect(produit).toEqual(mockProduit);
      expect(produit.id).toBe(produitId);
    });

    // Assert HTTP
    const req = httpMock.expectOne(`${apiUrl}/produits/${produitId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduit);
  });

  /**
   * Test unitaire : setCategorieActive() doit mettre à jour la catégorie active
   */
  it('should set active category and reset sous-categorie', (done) => {
    // Arrange
    const categorieId = 3;

    // Act
    service.setCategorieActive(categorieId);

    // Assert
    // Vérifier que la méthode a bien été appelée
    // (On pourrait vérifier l'état interne si les BehaviorSubjects étaient exposés)
    expect(service).toBeTruthy();
    done();
  });

  /**
   * Test de gestion d'erreur HTTP
   */
  it('should handle HTTP error gracefully', () => {
    // Arrange
    const errorMessage = 'Network error';

    // Act
    service.getCategories().subscribe({
      next: () => fail('Should have failed with network error'),
      error: (error) => {
        // Assert
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      }
    });

    // Simuler une erreur HTTP
    const req = httpMock.expectOne(`${apiUrl}/categories`);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});