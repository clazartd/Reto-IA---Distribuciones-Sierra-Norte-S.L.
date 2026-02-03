import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { SessionService } from './session.service';
import { User } from '../models/user.model';
import { Role } from '../constants/roles.constants';

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
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private sessionService: SessionService,
    private http: HttpClient
  ) {}

  login(credentials: Credentials): Observable<User | null> {
    return this.http.post<{ user: User | null; message?: string }>(
      `${this.apiUrl}/login`,
      credentials
    ).pipe(
      map(response => response.user || null),
      catchError(() => of(null))
    );
  }

  register(data: {username: string, password: string, role: string}): Observable<User | null> {
    return this.http.post<{ user: User | null; message?: string }>(
      `${this.apiUrl}/register`,
      data
    ).pipe(
      map(response => response.user || null),
      catchError(() => of(null))
    );
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
