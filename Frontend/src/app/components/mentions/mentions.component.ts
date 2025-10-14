import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mentions',
  imports: [RouterLink, CommonModule],
  templateUrl: './mentions.component.html',
  styleUrl: './mentions.component.css'
})
export class MentionsComponent {

  email:string = "tony.vercruysse@hotmail.com"
  dateUpdate = new Date()

}
