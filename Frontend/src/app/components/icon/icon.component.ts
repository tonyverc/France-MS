import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true, // composant indépendant
  imports: [NgIf],
  template: `
    <svg *ngIf="name==='home'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
    </svg>

    <svg *ngIf="name==='droplet'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 2.25c0 0-7.5 8.25-7.5 12a7.5 7.5 0 0015 0c0-3.75-7.5-12-7.5-12z"/>
    </svg>

    <svg *ngIf="name==='engrenage'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 lg:text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8 4c0-.35-.03-.69-.08-1.02l2.11-1.65-2-3.46-2.49 1c-.52-.4-1.08-.73-1.67-1l-.37-2.65h-4l-.37 2.65c-.59.27-1.15.6-1.67 1l-2.49-1-2 3.46 2.11 1.65c-.05.33-.08.67-.08 1.02s.03.69.08 1.02L2.69 14.67l2 3.46 2.49-1c.52.4 1.08.73 1.67 1l.37 2.65h4l.37-2.65c.59-.27 1.15-.6 1.67-1l2.49 1 2-3.46-2.11-1.65c.05-.33.08-.67.08-1.02z"/>
    </svg>

    <svg *ngIf="name==='funnel'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h18M6 9.75h12M9 15h6m-3 4.5v-4.5"/>
    </svg>

    <svg *ngIf="name==='user'" xmlns="http://www.w3.org/2000/svg"
     fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 mr-2 text-white">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a9.003 9.003 0 0114.998 0 .75.75 0 01-.598 1.382H5.099a.75.75 0 01-.598-1.382z"/></svg>
    
    <svg *ngIf="name==='search'" class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round"stroke-linecap="round"stroke-width="2.5"fill="none"stroke="currentColor">
        <circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g>
    </svg>

    <svg *ngIf="name==='burger'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"/>
    </svg>

    <svg *ngIf="name==='contact'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63 A2 2 0 0 1 4.11 2h3 a2 2 0 0 1 2 1.72c.12.81.37 1.6.72 2.34 a2 2 0 0 1-.45 2.11L8.09 9.91 a16 16 0 0 0 6 6l1.74-1.29 a2 2 0 0 1 2.11-.45c.74.35 1.53.6 2.34.72 A2 2 0 0 1 22 16.92z"/>
    </svg>



  `
})
export class IconComponent {
  @Input() name!: string;
}
