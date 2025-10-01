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
    });
  }

successMessage:string = '';

onSubmit() {
  if (this.contactForm.valid) {
    this.http.post<{ success: boolean; message: string }>(
      'http://localhost:8000/api/message',
      this.contactForm.value
    ).subscribe({
      next: (res) => {
        this.successMessage = res.message; // 🔥 stock le message
        this.contactForm.reset();
        setTimeout(() => this.successMessage = '', 4000); // auto-disparition
      },
      error: () => {
        this.successMessage = "❌ Erreur lors de l'envoi du message.";
      }
    });
  }
}
}
