import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    title: 'Clientes',
    // Componente de listado será agregado al declarar
    children: [
      { path: '', loadComponent: () => import('./pages/listado-clientes/listado-clientes.component').then(m => m.ListadoClientesComponent) },
      { path: 'nuevo', loadComponent: () => import('./pages/nuevo-cliente/nuevo-cliente.component').then(m => m.NuevoClienteComponent) },
      { path: 'editar/:id', loadComponent: () => import('./pages/editar-cliente/editar-cliente.component').then(m => m.EditarClienteComponent) },
      // El detalle de cliente puede ser una ruta más tarde
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
