// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DowntimeComponent } from './downtime/downtime.component';
import { OeeJphComponent } from './oee-jph/oee-jph.component';
import { TiempoCicloRobotsComponent } from './tiempo-ciclo-robots/tiempo-ciclo-robots.component';
import { TiempoCicloEstacionComponent } from './tiempo-ciclo-estacion/tiempo-ciclo-estacion.component';
import { TiempoLimadoComponent } from './tiempo-limado/tiempo-limado.component';
import { TiempoProductivoComponent } from './tiempo-productivo/tiempo-productivo.component';
import { LoginComponent } from './login/login.component'; // Importa tu componente de login
import { AuthGuard } from './guards/auth.guard'; // Importa tu guard de autenticación
import { GrandesPerdidasComponent } from './grandes-perdidas/grandes-perdidas.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent}, // Ruta del login
  { path: '', redirectTo: '/downtime', pathMatch: 'full' },
  { path: 'downtime', component: DowntimeComponent },
  { path: 'grandes-perdidas', component: GrandesPerdidasComponent },
  { path: 'oee-jph', component: OeeJphComponent },
  { path: 'tiempo-ciclo-robots', component: TiempoCicloRobotsComponent },
  { path: 'tiempo-ciclo-estacion', component: TiempoCicloEstacionComponent },
  { path: 'tiempo-limado', component: TiempoLimadoComponent },
  { path: 'tiempo-productivo', component: TiempoProductivoComponent }
];
