import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Pedido } from '../../../core/models/pedido.model';

@Component({
  selector: 'app-editar-pedido',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.scss']
})
export class EditarPedidoComponent {
  @Input() pedido: Pedido | null = null;
  @Input() editable: boolean = true;
  @Output() saved = new EventEmitter<Pedido>();
  @Output() closed = new EventEmitter<void>();

  editForm: FormGroup;
  showModal = false;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      cliente: ['', Validators.required],
      productos: this.fb.array([]),
      fechaEntrega: ['', Validators.required],
      estado: ['']
    });
  }

  open(pedido: Pedido, editable: boolean = true) {
    this.pedido = pedido;
    this.editable = editable;
    this.editForm.reset();
    this.editForm.patchValue({
      cliente: pedido.clienteId,
      fechaEntrega: pedido.fechaPrevistaEntrega,
      estado: pedido.estado
    });
    // Set array for productos
    const productosArray = this.editForm.get('productos') as FormArray;
    productosArray.clear();
    if (pedido.productos) {
      pedido.productos.forEach((prod: any) =>
        productosArray.push(this.fb.group({
          producto: [prod.producto || '', Validators.required],
          cantidad: [prod.cantidad || 1, [Validators.required, Validators.min(1)]]
        }))
      );
    }
    this.showModal = true;
  }

  close() {
    this.showModal = false;
    this.closed.emit();
  }

  get productos(): FormArray {
    return this.editForm.get('productos') as FormArray;
  }

  addProducto() {
    if (this.editable) {
      this.productos.push(this.fb.group({
        producto: ['', Validators.required],
        cantidad: ['', [Validators.required, Validators.min(1)]]
      }));
    }
  }

  removeProducto(i: number) {
    if (this.editable && this.productos.length > 1) {
      this.productos.removeAt(i);
    }
  }

  submit() {
    if (!this.editForm.valid || !this.pedido || !this.editable) return;
    const updated: Pedido = {
      ...this.pedido,
      clienteId: this.editForm.value.clienteId,
      productos: this.editForm.value.productos,
      fechaPrevistaEntrega: this.editForm.value.fechaEntrega,
      estado: this.editForm.value.estado
    };
    this.saved.emit(updated);
    this.close();
  }
}
