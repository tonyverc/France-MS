import { Routes } from '@angular/router';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { HomeComponent } from './components/home/home.component';
import { MentionsComponent } from './components/mentions/mentions.component';
import { ProduitsComponent } from './components/produits/produits.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

export const routes: Routes = [

  {path:'', component: HomeComponent},
  {path: 'login', component: AdminLoginComponent},
  {path: 'produits/:id', component: ProduitsComponent},
  {path: 'lubrifiants', component: HomeComponent},
  {path: 'graisses', component: HomeComponent},
  {path: 'filtrations', component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'plan-du-site', component: SitemapComponent},
  {path: 'mentions-legales', component: MentionsComponent},
  {path:'**',redirectTo:''}

];
