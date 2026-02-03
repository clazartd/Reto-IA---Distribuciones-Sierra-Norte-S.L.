import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { ClientesRoutingModule } from './clientes-routing.module';

import { ListadoClientesComponent } from './pages/listado-clientes/listado-clientes.component';
import { NuevoClienteComponent } from './pages/nuevo-cliente/nuevo-cliente.component';
import { EditarClienteComponent } from './pages/editar-cliente/editar-cliente.component';

@NgModule({
  imports: [
    CommonModule,
    ClientesRoutingModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    ListadoClientesComponent,
    NuevoClienteComponent,
    EditarClienteComponent
  ],
})
export class ClientesModule {}
