import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string = '';
  imgForm : string ='assets/images/peniche-2.jpg'

  constructor(
    private fb: FormBuilder , 
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

  // Gestion de la soumission du formulaire erreur ou redirection vers le login
  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }
    this.login();
  }

  // récupérer l'admin connecté
  login(){
    const { nom, email, password} = this.loginForm.value;
    this.authService.login(nom, email, password).subscribe({
      next: () => {
        window.location.href = 'http://localhost:8000/admin/';
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Nom, email ou mot de passe incorrect';
      }
    });
  }

}

