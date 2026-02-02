import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

/**
 * SessionService: Administra la sesión de usuario autenticado.
 * Gestiona la persistencia en localStorage/sessionStorage del usuario y su rol.
 * No almacena contraseñas ni datos sensibles.
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private static readonly SESSION_KEY = 'sessionUser';

  setSession(user: User): void {
    localStorage.setItem(SessionService.SESSION_KEY, JSON.stringify(user));
  }

  getSession(): User | null {
    const data = localStorage.getItem(SessionService.SESSION_KEY);
    return data ? JSON.parse(data) as User : null;
  }

  clearSession(): void {
    localStorage.removeItem(SessionService.SESSION_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getSession();
  }

  getUserRole(): string | null {
    const user = this.getSession();
    return user ? user.role : null;
  }
}
