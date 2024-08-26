// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DowntimeComponent } from './components/downtime/downtime.component';
import { OeeJphComponent } from './components/oee-jph/oee-jph.component';
import { TiempoCicloEstacionComponent } from './components/tiempo-ciclo-estacion/tiempo-ciclo-estacion.component';
import { TiempoProductivoComponent } from './components/tiempo-productivo/tiempo-productivo.component';
import { LoginComponent } from './components/login/login.component'; // Importa tu componente de login
import { AuthGuard } from './guards/auth.guard'; // Importa tu guard de autenticación
import { GrandesPerdidasComponent } from './components/grandes-perdidas/grandes-perdidas.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';


export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component: LoginComponent}, // Ruta del login
  { path: '', redirectTo: '/downtime', pathMatch: 'full' },
  { path: 'downtime', component: DowntimeComponent },
  { path: 'grandes-perdidas', component: GrandesPerdidasComponent },
  { path: 'oee-jph', component: OeeJphComponent },
  { path: 'tiempo-ciclo-estacion', component: TiempoCicloEstacionComponent },
  { path: 'tiempo-productivo', component: TiempoProductivoComponent },
  { path: 'tiempo-productivo', component: SearchBarComponent }
];
