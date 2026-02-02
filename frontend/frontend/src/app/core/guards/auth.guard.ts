import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SessionService } from '../services/session.service';

/**
 * AuthGuard: Protege rutas requeridas, redirige a /login si el usuario no está autenticado.
 * Prepara la base para extensión a control por roles/permisos en el futuro.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.sessionService.isAuthenticated()) {
      return true;
    }
    // Redirección a login si no hay sesión activa.
    return this.router.parseUrl('/login');
  }
}
