import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { NuevoPedidoComponent } from './pages/nuevo-pedido/nuevo-pedido.component';
import { ListadoPedidosComponent } from './pages/listado-pedidos/listado-pedidos.component';
import { Role } from '../../core/constants/roles.constants';

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
        Role.DIRECCION,
        Role.COMERCIAL,
        Role.ALMACEN,
        Role.REPARTO,
        Role.ADMINISTRACION,
      ]
    },
    component: ListadoPedidosComponent,
  },
  {
    path: 'nuevo',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.COMERCIAL] },
    component: NuevoPedidoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosRoutingModule {}
