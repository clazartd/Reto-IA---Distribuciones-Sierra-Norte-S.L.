import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { Role } from './core/constants/roles.constants';

// Lazy-load de los módulos funcionales para rutas principales
export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'inicio',
    loadChildren: () => import('./features/inicio/inicio.module').then(m => m.InicioModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.DIRECCION, Role.COMERCIAL, Role.ALMACEN, Role.REPARTO, Role.ADMINISTRACION] }
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./features/pedidos/pedidos.module').then(m => m.PedidosModule),
  },
  { path: '**', redirectTo: 'login' }
];
