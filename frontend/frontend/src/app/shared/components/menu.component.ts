import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionService } from '../../core/services/session.service';
import { ROLES } from '../../core/constants/roles.constants';

interface MenuItem {
  label: string;
  route: string;
  roles: string[];
}

/**
 * MenuComponent
 * Menú de navegación dinámico por rol.
 * Muestra solo las rutas permitidas a cada perfil.
 */
@Component({
  standalone: true,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class MenuComponent {
  items: MenuItem[] = [
    {
      label: 'Inicio',
      route: '/inicio',
      roles: [
        ROLES.DIRECCION,
        ROLES.COMERCIAL,
        ROLES.ALMACEN,
        ROLES.REPARTO,
        ROLES.ADMINISTRACION,
      ],
    },
    // Agregar aquí nuevas opciones de menú según la expansión de módulos/roles. Ejemplo:
    // {
    //   label: 'Pedidos',
    //   route: '/pedidos',
    //   roles: [ROLES.COMERCIAL, ROLES.DIRECCION, ROLES.ADMINISTRACION],
    // },
  ];

  constructor(private sessionService: SessionService) {}

  get isLogged(): boolean {
    return this.sessionService.isAuthenticated();
  }

  get role(): string | null {
    return this.sessionService.getUserRole();
  }

  get visibleItems(): MenuItem[] {
    if (!this.role) return [];
    return this.items.filter(item => item.roles.includes(this.role!));
  }

  logout(): void {
    this.sessionService.clearSession();
    window.location.href = '/login';
  }
}
