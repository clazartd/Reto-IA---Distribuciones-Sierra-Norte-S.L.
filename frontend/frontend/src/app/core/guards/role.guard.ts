import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { SessionService } from '../services/session.service';
import { Observable } from 'rxjs';
import { Role } from '../constants/roles.constants';

/**
 * RoleGuard
 * Protege rutas comprobando si el usuario autenticado tiene el rol requerido para la ruta.
 * Los roles permitidos se deben definir en data.roles del objeto Route.
 * Si está permitido: permite el acceso.
 * Si no: redirige automáticamente a la ruta segura correspondiente al rol, o a /login si no hay sesión.
 */
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const requiredRoles: string[] = next.data['roles'] || [];
    const user = this.sessionService.getSession();

    // No usuario -> redirigir a login
    if (!user) {
      return this.router.createUrlTree(['/login']);
    }

    // Si no se han definido roles, permitir acceso (no restringido)
    if (requiredRoles.length === 0) {
      return true;
    }

    // Si el rol está permitido, acceso ok
    if (requiredRoles.includes(user.role)) {
      return true;
    }

    // Si no tiene acceso, redirigir a la ruta inicial por rol
    const defaultRoute = this.getDefaultRouteForRole(user.role);
    return this.router.createUrlTree([defaultRoute]);
  }

  /**
   * Define la ruta inicial segura para cada rol.
   * Modificar aquí si se añaden módulos/rutas futuras.
   */
  private getDefaultRouteForRole(role: string): string {
    switch (role) {
      case Role.DIRECCION:
        return '/inicio';
      case Role.COMERCIAL:
        return '/inicio';
      case Role.ALMACEN:
        return '/inicio';
      case Role.REPARTO:
        return '/inicio';
      case Role.ADMINISTRACION:
        return '/inicio';
      default:
        return '/login';
    }
  }
}
