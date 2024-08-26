import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router'; // Importa Router para la navegación

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SidebarModule, ButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public sidebarVisible: boolean = false;

  constructor(private router: Router) {}

  // Método para navegar a la ruta proporcionada y ocultar el sidebar
  navigateTo(route: string): void {
    this.sidebarVisible = false; // Oculta el sidebar
    this.router.navigate([route]); // Navega a la ruta proporcionada
  }
}
