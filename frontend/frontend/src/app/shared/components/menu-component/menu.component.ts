import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Role } from '../../../core/constants/roles.constants';
import { SessionService } from '../../../core/services/session.service';

interface MenuItem {
  label: string;
  route?: string;
  roles: Role[];
  children?: MenuItem[];
}

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
        Role.DIRECCION,
        Role.COMERCIAL,
        Role.ALMACEN,
        Role.REPARTO,
        Role.ADMINISTRACION,
      ],
    },
    {
      label: 'Pedidos',
      roles: [
        Role.DIRECCION,
        Role.COMERCIAL,
        Role.ALMACEN,
        Role.REPARTO,
        Role.ADMINISTRACION,
      ],
      children: [
        {
          label: 'Listado de pedidos',
          route: '/pedidos/listado',
          roles: [
            Role.DIRECCION,
            Role.COMERCIAL,
            Role.ALMACEN,
            Role.REPARTO,
            Role.ADMINISTRACION,
          ],
        },
        {
          label: 'Preparación de pedidos',
          route: '/pedidos/preparacion',
          roles: [Role.ALMACEN],
        },
        {
          label: 'Nuevo pedido',
          route: '/pedidos/nuevo',
          roles: [Role.COMERCIAL],
        },
      ],
    },
  ];

  username: string | null = null;
  dropdownOpen = false;

  public Role = Role; // Expose enum to template

  constructor(public sessionService: SessionService) {
    const user = this.sessionService.getUser();
    this.username = user ? user.username : null;
  }

  get isLogged(): boolean {
    return this.sessionService.isAuthenticated();
  }

  get role(): Role | null {
    return this.sessionService.getUserRole() as Role | null;
  }

  get visibleItems(): MenuItem[] {
    if (!this.role) return [];
    return this.items
      .map(item => {
        if (item.children) {
          const visibleChildren = item.children.filter(child => child.roles.includes(this.role!));
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

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.dropdownOpen = false;
  }
}
