import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string = '';
  loading = false;
  imgForm: string = 'assets/images/peniche-2.jpg';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AdminAuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Gestion de la soumission du formulaire
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    // ✅ Récupérer les 3 champs (nom, email, password)
    const { nom, email, password } = this.loginForm.value;
    

    // ✅ Appeler le service avec les 3 paramètres
    this.authService.login(nom, email, password).subscribe({
      next: (response) => {
        console.log('✅ Connexion réussie:', response);
        this.loading = false;
                
        // ✅ Redirection vers la page d'accueil
        this.router.navigate(['/']).then(() => {
        });
      },
      error: (err) => {
        this.loading = false;
        // Afficher le message d'erreur du backend
        this.errorMessage = err.error?.message || 'Une erreur est survenue lors de la connexion';
      }
    });
  }

  // Helper methods pour faciliter l'accès aux contrôles dans le template
  get nom() {
    return this.loginForm.get('nom');
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}