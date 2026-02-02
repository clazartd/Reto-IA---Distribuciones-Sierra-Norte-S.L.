import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROLES } from '../../../core/constants/roles.constants';
import { SessionService } from '../../../core/services/session.service';

interface MenuItem {
  label: string;
  route?: string;
  roles: string[];
  children?: MenuItem[];
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
    {
      label: 'Pedidos',
      roles: [
        ROLES.DIRECCION,
        ROLES.COMERCIAL,
        ROLES.ALMACEN,
        ROLES.REPARTO,
        ROLES.ADMINISTRACION,
      ],
      children: [
        {
          label: 'Listado de pedidos',
          route: '/pedidos/listado',
          roles: [
            ROLES.DIRECCION,
            ROLES.COMERCIAL,
            ROLES.ALMACEN,
            ROLES.REPARTO,
            ROLES.ADMINISTRACION,
          ],
        },
        {
          label: 'Preparación de pedidos',
          route: '/pedidos/preparacion',
          roles: [ROLES.ALMACEN],
        },
        {
          label: 'Nuevo pedido',
          route: '/pedidos/nuevo',
          roles: [ROLES.COMERCIAL],
        },
        // { label: 'Histórico de pedidos', route: '/pedidos/historico', roles: [ROLES.DIRECCION, ROLES.COMERCIAL] },
      ],
    },
  ];

  constructor(private sessionService: SessionService) {}

  get isLogged(): boolean {
    return this.sessionService.isAuthenticated();
  }

  get role(): string | null {
    return this.sessionService.getUserRole();
  }

  // Solo deja padres con al menos un hijo visible para el rol actual
  get visibleItems(): MenuItem[] {
    if (!this.role) return [];
    return this.items
      .map(item => {
        if (item.children) {
          const visibleChildren = item.children.filter(child => child.roles.includes(this.role!));
          // Solo mantenemos el padre si tiene al menos un hijo visible
          return visibleChildren.length > 0
            ? { ...item, children: visibleChildren }
            : null;
        }
        return item.roles.includes(this.role!) ? item : null;
      })
      .filter(Boolean) as MenuItem[];
  }

  logout(): void {
    this.sessionService.clearSession();
    window.location.href = '/login';
  }
}
