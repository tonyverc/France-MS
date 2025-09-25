import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { CardProduitsComponent } from './components/card-produits/card-produits.component';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HomeComponent, CardProduitsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
}
