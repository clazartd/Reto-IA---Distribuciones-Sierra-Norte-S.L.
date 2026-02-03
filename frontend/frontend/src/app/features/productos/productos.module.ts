import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosRoutingModule } from './productos-routing.module';
import { ListadoProductosComponent } from './pages/listado-productos/listado-productos.component';
import { NuevoProductoComponent } from './pages/nuevo-producto/nuevo-producto.component';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';

@NgModule({
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ListadoProductosComponent,
    NuevoProductoComponent,
    EditarProductoComponent
  ]
})
export class ProductosModule {}
