import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { Role } from '../../core/constants/roles.constants';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listado',
    pathMatch: 'full'
  },
  {
    path: 'listado',
    // Sin AuthGuard ni RoleGuard: acceso libre a usuarios autenticados
    loadComponent: () =>
      import('./pages/listado-productos/listado-productos.component').then(m => m.ListadoProductosComponent)
  },
  {
    path: 'nuevo',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.COMERCIAL, Role.ADMINISTRACION, Role.DIRECCION, Role.ALMACEN] },
    loadComponent: () =>
      import('./pages/nuevo-producto/nuevo-producto.component').then(m => m.NuevoProductoComponent)
  },
  {
    path: 'editar/:id',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.COMERCIAL, Role.ADMINISTRACION, Role.DIRECCION, Role.ALMACEN] },
    loadComponent: () =>
      import('./pages/editar-producto/editar-producto.component').then(m => m.EditarProductoComponent)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosRoutingModule {}
