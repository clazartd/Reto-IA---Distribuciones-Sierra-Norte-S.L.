import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    title: 'Clientes',
    children: [
      { path: '', loadComponent: () => import('./pages/listado-clientes/listado-clientes.component').then(m => m.ListadoClientesComponent) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
