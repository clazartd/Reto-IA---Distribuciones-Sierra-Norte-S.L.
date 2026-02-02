import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

/**
 * Placeholder para la pantalla inicial del sistema.
 * Solo accesible si hay sesión activa.
 */
@Component({
  selector: 'app-inicio',
  template: `
    <div class="container mt-5">
      <h3 class="mb-4">¡Bienvenido! Estás autenticado.</h3>
      <button (click)="logout()" class="btn btn-outline-secondary">Cerrar sesión</button>
    </div>
  `
})
export class InicioComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
