import { Routes } from '@angular/router';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { HomeComponent } from './components/home/home.component';
import { MentionsComponent } from './components/mentions/mentions.component';

export const routes: Routes = [

  {path:'', component: HomeComponent},
  {path: 'lubrifiants', component: HomeComponent},
  {path: 'graisses', component: HomeComponent},
  {path: 'filtrations', component: HomeComponent},
  {path: 'contact', component: HomeComponent},
  {path: 'plan-du-site', component: SitemapComponent},
  {path: 'mentions-legales', component: MentionsComponent},
  {path:'**',redirectTo:''}

];
