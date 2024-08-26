import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly SESSION_TIMEOUT = 10 * 60 * 1000; // 10 minutos
  private lastActivity: number = Date.now();

  constructor(private router: Router) {
    this.checkSessionTimeout();
  }

  login(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.lastActivity = Date.now();
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    console.log('Entro a isLoggedIn del AuthService');
    const user = localStorage.getItem('user');
    console.log('El user es:',user);
    return !!user;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  private checkSessionTimeout() {
    /*
    setInterval(() => {
      if (Date.now() - this.lastActivity > this.SESSION_TIMEOUT) {
        this.logout();
      }
    }, 1000);*/
  }

  updateActivity() {
    this.lastActivity = Date.now();
  }
}
