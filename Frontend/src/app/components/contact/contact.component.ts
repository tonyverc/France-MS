import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {

  imgForm: string = 'assets/images/peniche-formulaire.jpg';
  contactForm: FormGroup;

  alertMessage: string | null = null;
  alertType: 'success' | 'error' = 'success';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contenu: ['', [Validators.required, Validators.minLength(10)]],
      telephone: [''], // optionnel
      consentement: [false, Validators.requiredTrue]
    });
  }

  // Méthode générique pour envoyer le message à l'API
  createMessage(data: any): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>('http://localhost:8000/api/message', data);
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.contactForm.invalid) {
      this.alertMessage = '❌ Veuillez remplir correctement tous les champs.';
      this.alertType = 'error';
      return;
    }

    this.createMessage(this.contactForm.value).subscribe({
      next: (res) => {
        this.alertMessage = res.message || '✅ Votre message a bien été envoyé !';
        this.alertType = 'success';
        this.contactForm.reset();
        setTimeout(() => this.alertMessage = null, 4000); // disparition automatique
      },
      error: (err) => {
        console.error('Erreur API:', err);
        this.alertMessage = err.error?.message || "❌ Erreur lors de l'envoi du message.";
        this.alertType = 'error';
      }
    });
  }
}
