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
    // Aquí debe integrarse la llamada al endpoint real '/auth/login'.
    // Por ahora simula respuesta (mock) para desarrollo sin backend.
    // Sustituir "dummy" por integración real cuando el backend esté disponible.
    const dummyUsers = [
      { id: 1, username: 'direccion', role: ROLES.DIRECCION },
      { id: 2, username: 'comercial', role: ROLES.COMERCIAL },
      { id: 3, username: 'almacen', role: ROLES.ALMACEN },
      { id: 4, username: 'reparto', role: ROLES.REPARTO },
      { id: 5, username: 'admin', role: ROLES.ADMINISTRACION },
    ];
    const found = dummyUsers.find(
      u => u.username === credentials.username && credentials.password === '1234'
    );
    return of(found || null);
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
