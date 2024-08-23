import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DowntimeComponent } from './downtime/downtime.component';


export const routes: Routes = [
  { path: '', component: DowntimeComponent },
  { path: 'downtime', component: DowntimeComponent }
];
