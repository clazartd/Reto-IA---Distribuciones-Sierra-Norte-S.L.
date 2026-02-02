import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SessionService } from './session.service';
import { User } from '../models/user.model';
import { ROLES } from '../constants/roles.constants';

export interface Credentials {
  username: string;
  password: string;
}

/**
 * AuthService: Responsable de procesar login/logout y exponer estado de autenticación.
 * Lógica centralizada aquí, siguiendo SRP y transfiriendo datos a SessionService.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private sessionService: SessionService) {}

  login(credentials: Credentials): Observable<User | null> {
    // Login siempre devuelve el usuario ALMACÉN para pruebas:
    const almacenUser: User = {
      id: 3,
      username: 'almacen',
      role: ROLES.ALMACEN
    };
    return of(almacenUser);
  }

  logout(): void {
    // Cierra sesión limpiando los datos del usuario.
    this.sessionService.clearSession();
  }

  isAuthenticated(): boolean {
    // Determina si hay sesión activa consultando SessionService.
    return this.sessionService.isAuthenticated();
  }
}
