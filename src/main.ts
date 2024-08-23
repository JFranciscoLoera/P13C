import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { provideRouter, RouterOutlet } from '@angular/router';
import { routes } from './app/app.routes';

// Configura y arranca la aplicación Angular
bootstrapApplication(AppComponent, {
  providers: [
    // Proporciona BrowserAnimationsModule y el enrutador
    importProvidersFrom(BrowserAnimationsModule),
    provideRouter(routes) // Proporciona el enrutador con las rutas definidas
  ]
})
.catch(err => console.error(err));
