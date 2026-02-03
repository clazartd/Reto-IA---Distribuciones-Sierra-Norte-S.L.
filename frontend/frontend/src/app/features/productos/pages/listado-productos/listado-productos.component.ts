import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../../../core/models/producto.model';
import { ProductosService } from '../../../../core/services/productos.service';
import { EditarProductoModalComponent } from '../../../../shared/components/editar-producto-modal/editar-producto-modal.component';
import { ConfirmarEliminarModalComponent } from '../../../../shared/components/confirmar-eliminar-modal/confirmar-eliminar-modal.component';
import { SessionService } from '../../../../core/services/session.service';
import { User } from '../../../../core/models/user.model';
import { Role } from '../../../../core/constants/roles.constants';

@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, EditarProductoModalComponent, ConfirmarEliminarModalComponent],
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss']
})
export class ListadoProductosComponent {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  busqueda = '';
  filtroEstado = '';
  modalEditarAbierto = false;
  productoEnEdicion: Producto | null = null;
  modalEliminarAbierto = false;
  productoAEliminar: Producto | null = null;
  user: User | null = null;

  constructor(
    private productosService: ProductosService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.cargarProductos();
    this.user = this.sessionService.getSession();
  }

  get puedeEditar(): boolean {
    // Solo los roles estos pueden editar/eliminar/crear productos
    return !!this.user && [
      Role.DIRECCION,
      Role.COMERCIAL,
      Role.ADMINISTRACION,
      Role.ALMACEN
    ].includes(this.user.role);
  }

  cargarProductos() {
    this.productosService.getProductos().subscribe(prod => {
      this.productos = prod;
      this.filtrarProductos();
    });
  }

  filtrarProductos() {
    this.productosFiltrados = this.productos.filter(p => {
      const coincideBusqueda =
        this.busqueda.trim() === '' ||
        (p.nombre?.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        p.descripcion?.toLowerCase().includes(this.busqueda.toLowerCase()));
      const coincideEstado =
        this.filtroEstado === '' || String(p.disponible) === this.filtroEstado;
      return coincideBusqueda && coincideEstado;
    });
  }

  abrirModalCrear() {
    this.productoEnEdicion = null;
    this.modalEditarAbierto = true;
  }

  abrirModalEditar(p: Producto) {
    this.productoEnEdicion = { ...p };
    this.modalEditarAbierto = true;
  }

  cerrarModalEditar() {
    this.productoEnEdicion = null;
    this.modalEditarAbierto = false;
  }

  onGuardarProducto(prod: Producto) {
    if (prod.id) {
      this.productosService.updateProducto(prod.id, prod).subscribe(() => this.cargarProductos());
    } else {
      this.productosService.createProducto(prod).subscribe(() => this.cargarProductos());
    }
    this.cerrarModalEditar();
  }

  abrirModalEliminar(prod: Producto) {
    this.productoAEliminar = prod;
    this.modalEliminarAbierto = true;
  }

  cerrarModalEliminar() {
    this.productoAEliminar = null;
    this.modalEliminarAbierto = false;
  }

  onConfirmarEliminar() {
    if (this.productoAEliminar) {
      this.eliminarProducto(this.productoAEliminar.id);
    }
    this.cerrarModalEliminar();
  }

  eliminarProducto(id: string) {
    // Simulación de borrado, hasta que se implemente en el service real
    this.productos = this.productos.filter(p => p.id !== id);
    this.filtrarProductos();
  }

  ngOnChanges() { this.filtrarProductos(); }
  ngDoCheck() { this.filtrarProductos(); }
}
