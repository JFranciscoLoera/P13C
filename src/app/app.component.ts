// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './shared/dashboard/dashboard.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent,DashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'P13C';
  sidebarVisible: boolean = false; // Controla la visibilidad del sidebar

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Verificar la autenticación al iniciar el componente
    // if (!this.authService.isLoggedIn() && this.router.url !== '/login') {
    //   // Redirigir al usuario al login si no está autenticado
    //   this.router.navigate(['/login']);
    // }
  }

  // Método para navegar a la ruta proporcionada y ocultar el sidebar
  navigateTo(route: string): void {
    this.sidebarVisible = false; // Oculta el sidebar
    this.router.navigate([route]); // Navega a la ruta proporcionada
  }
}

