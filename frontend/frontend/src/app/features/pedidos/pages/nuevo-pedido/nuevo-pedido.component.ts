import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PedidosService } from '../../../../core/services/pedidos.service';
import { Pedido, Estado } from '../../../../core/models/pedido.model';
import { Producto } from '../../../../core/models/producto.model';

@Component({
  standalone: true,
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class NuevoPedidoComponent {
  @Output() closed = new EventEmitter<void>();

  pedidoForm: FormGroup;
  statusMessage: string | null = null;
  errorMessage: string | null = null;
  isSubmitting = false;
  showModal = false;

  constructor(private fb: FormBuilder, private pedidosService: PedidosService) {
    this.pedidoForm = this.fb.group({
      clienteId: ['', Validators.required], // Cambiado a clienteId
      productos: this.fb.array([this.createProductoGroup()]), // Al menos un producto
      fechaEntrega: ['', Validators.required],
      urgente: [false]
    });
  }

  open() {
    this.showModal = true;
  }

  close() {
    this.showModal = false;
    this.closed.emit();
  }

  get productos(): FormArray {
    return this.pedidoForm.get('productos') as FormArray;
  }

  createProductoGroup(): FormGroup {
    return this.fb.group({
      producto: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
    });
  }

  addProducto() {
    this.productos.push(this.createProductoGroup());
  }

  removeProducto(index: number) {
    if (this.productos.length > 1)
      this.productos.removeAt(index);
  }

  submit() {
    this.statusMessage = null;
    this.errorMessage = null;

    if (this.pedidoForm.invalid) {
      this.errorMessage = 'Revisa los datos antes de continuar.';
      return;
    }

    this.isSubmitting = true;
    // Simulación de cálculo de total (puede mejorarse conectando con los productos reales)
    const total = 0;

    const pedido: Pedido = {
      id: 0,
      numeroPedido: '', // El backend debe asignar luego
      clienteId: this.pedidoForm.value.clienteId,
      productos: this.pedidoForm.value.productos as Producto[], // Puede necesitar mapeo real según backend/data
      fechaSolicitud: new Date(),
      fechaPrevistaEntrega: this.pedidoForm.value.fechaEntrega,
      estado: Estado.REGISTRADO,
      urgente: this.pedidoForm.value.urgente ?? false,
      total
    };

    this.pedidosService.createPedido(pedido).subscribe({
      next: () => {
        this.statusMessage = 'El pedido se registró correctamente.';
        this.pedidoForm.reset();
        // Reset productos array to one row
        while (this.productos.length > 1) {
          this.productos.removeAt(0);
        }
        this.productos.at(0).reset();
        this.isSubmitting = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo registrar el pedido. Intenta más tarde.';
        this.isSubmitting = false;
      }
    });
  }
}
