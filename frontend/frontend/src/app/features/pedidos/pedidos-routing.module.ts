import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { ROLES } from '../../core/constants/roles.constants';
import { NuevoPedidoComponent } from './pages/nuevo-pedido/nuevo-pedido.component';
import { ListadoPedidosComponent } from './pages/listado-pedidos/listado-pedidos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listado',
    pathMatch: 'full'
  },
  {
    path: 'listado',
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [
        ROLES.DIRECCION,
        ROLES.COMERCIAL,
        ROLES.ALMACEN,
        ROLES.REPARTO,
        ROLES.ADMINISTRACION,
      ]
    },
    component: ListadoPedidosComponent,
  },
  {
    path: 'nuevo',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [ROLES.COMERCIAL] },
    component: NuevoPedidoComponent,
  },
  {
    path: 'preparacion',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [ROLES.ALMACEN] },
    loadComponent: () =>
      import('./pages/preparacion-pedidos/preparacion-pedidos.component').then(m => m.PreparacionPedidosComponent)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosRoutingModule {}
