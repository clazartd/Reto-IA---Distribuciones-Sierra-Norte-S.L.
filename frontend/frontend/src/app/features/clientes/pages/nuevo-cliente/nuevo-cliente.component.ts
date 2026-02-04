import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientesService } from '../../../../core/services/clientes.service';
import { Cliente } from '../../../../core/models/cliente.model';

@Component({
  selector: 'app-nuevo-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.scss']
})
export class NuevoClienteComponent implements OnChanges {
  @Input() cliente: Cliente | null = null;
  @Input() modoEdicion: boolean = false;
  @Output() cerrar = new EventEmitter<void>();

  // Objeto editable en formulario
  formCliente = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    provincia: '',
    codigoPostal: '',
    contacto: ''
  };

  loading = false;
  error: string | null = null;

  constructor(private clientesService: ClientesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cliente'] || changes['modoEdicion']) {
      if (this.modoEdicion && this.cliente) {
        this.formCliente = {
          nombre: this.cliente.nombre || '',
          email: this.cliente.email || '',
          telefono: this.cliente.telefono || '',
          direccion: this.cliente.direccion || '',
          provincia: this.cliente.provincia || '',
          codigoPostal: this.cliente.codigoPostal || (this.cliente as any).codigo_postal || '',
          contacto: this.cliente.contacto || ''
        };
      } else {
        // Nuevo cliente: limpiar formulario
        this.formCliente = {
          nombre: '',
          email: '',
          telefono: '',
          direccion: '',
          provincia: '',
          codigoPostal: '',
          contacto: ''
        };
      }
    }
  }

  guardarCliente() {
    if (!this.formCliente.nombre || !this.formCliente.nombre.trim()) {
      this.error = 'El nombre es obligatorio';
      return;
    }
    this.error = null;
    this.loading = true;

    if (this.modoEdicion && this.cliente) {
      this.clientesService.updateCliente(this.cliente.id, this.formCliente).subscribe({
        next: () => {
          this.loading = false;
          this.cerrar.emit();
        },
        error: err => {
          this.loading = false;
          this.error = err?.error?.error || 'Error al actualizar cliente';
        }
      });
    } else {
      this.clientesService.createCliente(this.formCliente).subscribe({
        next: () => {
          this.loading = false;
          this.cerrar.emit();
        },
        error: err => {
          this.loading = false;
          this.error = err?.error?.error || 'Error al guardar cliente';
        }
      });
    }
  }
}
