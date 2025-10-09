import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {

  imgForm:string = 'assets/images/peniche-formulaire.jpg'
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contenu: ['', [Validators.required, Validators.minLength(10)]],
      telephone: [''], // optionnel
      consentement: [false, Validators.requiredTrue]
    });
  }

alertMessage: string | null = null;
alertType: 'success'| 'error' = 'success';

// soumission du formulaire a l'api
onSubmit() {
  if (this.contactForm.valid) {
    this.http.post<{ success: boolean; message: string }>(
      'http://localhost:8000/api/message',
      this.contactForm.value
    ).subscribe({

      //gestion du message de confirmation ou echec de l'envoi du message
      next: () => {
        this.alertMessage = '✅ Votre message a bien été envoyé !';
        this.alertType = 'success';
        this.contactForm.reset();
        setTimeout(() => this.alertMessage = '', 4000); // auto-disparition de l'alerte aprés 4s
      },
      error: () => {
        this.alertMessage = "❌ Erreur lors de l'envoi du message.";
        this.alertType = 'error';
      }
    });
  }
}
}
