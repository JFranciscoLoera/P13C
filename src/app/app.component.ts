import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para la navegación
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GrandesPerdidasComponent } from './grandes-perdidas/grandes-perdidas.component';
import { OeeJphComponent } from './oee-jph/oee-jph.component';
import { TiempoCicloEstacionComponent } from './tiempo-ciclo-estacion/tiempo-ciclo-estacion.component';
import { TiempoCicloRobotsComponent } from './tiempo-ciclo-robots/tiempo-ciclo-robots.component';
import { TiempoLimadoComponent } from './tiempo-limado/tiempo-limado.component';
import { TiempoProductivoComponent } from './tiempo-productivo/tiempo-productivo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent,
    GrandesPerdidasComponent, OeeJphComponent,
    TiempoCicloEstacionComponent, TiempoCicloRobotsComponent,
    TiempoLimadoComponent, TiempoProductivoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = 'P13C';
  sidebarVisible: boolean = false; // Controla la visibilidad del sidebar

  constructor(private router: Router) {}

  // Método para navegar a la ruta proporcionada y ocultar el sidebar
  navigateTo(route: string): void {
    this.sidebarVisible = false; // Oculta el sidebar
    this.router.navigate([route]); // Navega a la ruta proporcionada
  }
}
