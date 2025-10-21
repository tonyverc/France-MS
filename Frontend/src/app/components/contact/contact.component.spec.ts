import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact.component';
import { of, throwError } from 'rxjs';

describe('ContactComponent - Test Fonctionnel', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactComponent, // Composant standalone
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  /**
   * Test de création du composant
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test fonctionnel : Le formulaire doit être initialisé avec les bons champs
   */
  it('should initialize the contact form with correct fields', () => {
    // Assert
    expect(component.contactForm.contains('nom')).toBeTruthy();
    expect(component.contactForm.contains('email')).toBeTruthy();
    expect(component.contactForm.contains('contenu')).toBeTruthy();
    expect(component.contactForm.contains('telephone')).toBeTruthy();
    expect(component.contactForm.contains('consentement')).toBeTruthy();
  });

  /**
   * Test fonctionnel : Le formulaire doit être invalide quand vide
   */
  it('should be invalid when form is empty', () => {
    // Assert
    expect(component.contactForm.valid).toBeFalsy();
  });

  /**
   * Test fonctionnel : Validation de l'email
   */
  it('should validate email format', () => {
    // Arrange
    const emailControl = component.contactForm.get('email');

    // Act - Email invalide
    emailControl?.setValue('invalid-email');
    
    // Assert
    expect(emailControl?.hasError('email')).toBeTruthy();

    // Act - Email valide
    emailControl?.setValue('test@example.com');
    
    // Assert
    expect(emailControl?.hasError('email')).toBeFalsy();
  });

  /**
   * Test fonctionnel : Le contenu doit avoir minimum 10 caractères
   */
  it('should require minimum 10 characters for contenu', () => {
    // Arrange
    const contenuControl = component.contactForm.get('contenu');

    // Act - Contenu trop court
    contenuControl?.setValue('Court');
    
    // Assert
    expect(contenuControl?.hasError('minlength')).toBeTruthy();

    // Act - Contenu suffisamment long
    contenuControl?.setValue('Ceci est un message suffisamment long');
    
    // Assert
    expect(contenuControl?.hasError('minlength')).toBeFalsy();
  });

  /**
   * Test fonctionnel : Le consentement doit être coché
   */
  it('should require consentement to be checked', () => {
    // Arrange
    const consentementControl = component.contactForm.get('consentement');

    // Act - Non coché
    consentementControl?.setValue(false);
    
    // Assert
    expect(consentementControl?.hasError('required')).toBeTruthy();

    // Act - Coché
    consentementControl?.setValue(true);
    
    // Assert
    expect(consentementControl?.valid).toBeTruthy();
  });

  /**
   * TEST PRINCIPAL - Test fonctionnel complet : Remplir et soumettre le formulaire avec succès
   */
  it('should fill and submit the contact form successfully', () => {
    // Arrange - Remplir le formulaire avec des données valides
    component.contactForm.setValue({
      nom: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      contenu: 'Bonjour, je souhaite obtenir des informations sur vos produits.',
      telephone: '0601020304',
      consentement: true
    });

    // Vérifier que le formulaire est valide
    expect(component.contactForm.valid).toBeTruthy();

    // Réponse mockée du serveur
    const mockResponse = {
      success: true,
      message: 'Votre message a bien été envoyé !'
    };

    // Act - Soumettre le formulaire
    component.onSubmit();

    // Assert - Vérifier la requête HTTP
    const req = httpMock.expectOne('http://localhost:8000/api/message');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.nom).toBe('Jean Dupont');
    expect(req.request.body.email).toBe('jean.dupont@example.com');

    // Simuler la réponse du serveur
    req.flush(mockResponse);

    // Assert - Vérifier le message de succès
    expect(component.alertMessage).toContain('bien été envoyé');
    expect(component.alertType).toBe('success');
  });

  /**
   * Test fonctionnel : Soumission avec formulaire invalide
   */
  it('should show error message when submitting invalid form', () => {
    // Arrange - Formulaire vide (donc invalide)
    component.contactForm.reset();

    // Act - Tenter de soumettre
    component.onSubmit();

    // Assert - Vérifier le message d'erreur
    expect(component.alertMessage).toContain('Veuillez remplir correctement');
    expect(component.alertType).toBe('error');
  });

  /**
   * Test fonctionnel : Gestion des erreurs serveur
   */
  it('should handle server error when submitting form', () => {
    // Arrange - Remplir le formulaire
    component.contactForm.setValue({
      nom: 'Test User',
      email: 'test@example.com',
      contenu: 'Message de test pour erreur serveur',
      telephone: '',
      consentement: true
    });

    const mockError = {
      error: { message: 'Erreur serveur' },
      status: 500
    };

    // Act - Soumettre le formulaire
    component.onSubmit();

    // Simuler une erreur HTTP
    const req = httpMock.expectOne('http://localhost:8000/api/message');
    req.flush(mockError.error, { status: 500, statusText: 'Server Error' });

    // Assert - Vérifier le message d'erreur
    expect(component.alertMessage).toContain('Erreur');
    expect(component.alertType).toBe('error');
  });

  /**
   * Test fonctionnel : Le formulaire doit se réinitialiser après envoi réussi
   */
  it('should reset form after successful submission', () => {
    // Arrange
    component.contactForm.setValue({
      nom: 'Test User',
      email: 'test@example.com',
      contenu: 'Message de test',
      telephone: '0123456789',
      consentement: true
    });

    const mockResponse = { success: true, message: 'Message envoyé' };

    // Act
    component.onSubmit();
    const req = httpMock.expectOne('http://localhost:8000/api/message');
    req.flush(mockResponse);

    // Assert - Le formulaire doit être réinitialisé
    expect(component.contactForm.get('nom')?.value).toBeNull();
    expect(component.contactForm.get('email')?.value).toBeNull();
    expect(component.contactForm.get('contenu')?.value).toBeNull();
  });
});