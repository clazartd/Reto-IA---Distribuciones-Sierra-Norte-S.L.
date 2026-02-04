import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../../../core/models/cliente.model';
import { ClientesService } from '../../../../core/services/clientes.service';
import { SessionService } from '../../../../core/services/session.service';
import { Role } from '../../../../core/constants/roles.constants';
import { NuevoClienteComponent } from '../nuevo-cliente/nuevo-cliente.component';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-listado-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, NuevoClienteComponent, ConfirmModalComponent],
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  provinciasDisponibles: string[] = [];
  provinciaSeleccionada: string = '';
  busqueda: string = '';
  canEdit: boolean = false;

  mostrarNuevoClienteModal = false;
  mostrarEditarClienteModal = false;
  clienteAEditar: Cliente | null = null;

  mostrarConfirmModal = false;
  clienteAEliminar: Cliente | null = null;

  loading = false;
  error: string | null = null;

  constructor(
    private clientesService: ClientesService,
    private sessionService: SessionService,
    private cd: ChangeDetectorRef
  ) {}

  abrirModalNuevoCliente() {
    this.mostrarNuevoClienteModal = true;
  }
  cerrarModalNuevoCliente() {
    this.mostrarNuevoClienteModal = false;
    this.cargarClientes();
  }

  abrirModalEditarCliente(cliente: Cliente) {
    this.clienteAEditar = { ...cliente }; // Copia defensiva para evitar mutaciones accidentales
    this.mostrarEditarClienteModal = true;
    this.cd.detectChanges();
  }
  cerrarModalEditarCliente() {
    this.clienteAEditar = null;
    this.mostrarEditarClienteModal = false;
    this.cargarClientes();
  }

  ngOnInit() {
    this.cargarClientes();
    const rol = this.sessionService.getUserRole();
    this.canEdit = [Role.COMERCIAL, Role.ADMINISTRACION, Role.DIRECCION].includes(rol as Role);
  }

  cargarClientes() {
    this.loading = true;
    this.error = null;
    this.clientesService.getClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        this.clientesFiltrados = clientes;
        this.actualizarProvincias();
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.clientes = [];
        this.provinciasDisponibles = [];
        this.clientesFiltrados = [];
        this.loading = false;
        this.error = 'Error al cargar clientes';
        this.cd.detectChanges();
      }
    });
  }

  actualizarProvincias() {
    const provinciasSet = new Set<string>();
    this.clientes.forEach(cliente => {
      if (cliente.provincia) provinciasSet.add(cliente.provincia);
    });
    this.provinciasDisponibles = Array.from(provinciasSet).sort();
  }

  onDelete(cliente: Cliente) {
    this.clienteAEliminar = cliente;
    this.mostrarConfirmModal = true;
    this.cd.detectChanges();
  }

  confirmarEliminacion() {
    if (!this.clienteAEliminar) return;
    this.mostrarConfirmModal = false;
    this.loading = true;
    this.clientesService.deactivateCliente(this.clienteAEliminar.id).subscribe({
      next: () => {
        this.loading = false;
        this.cargarClientes();
        this.clienteAEliminar = null;
        this.cd.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.error = 'Error al eliminar cliente.';
        this.cd.detectChanges();
      }
    });
  }

  cancelarEliminacion() {
    this.clienteAEliminar = null;
    this.mostrarConfirmModal = false;
    this.cd.detectChanges();
  }

  onEdit(cliente: Cliente) {
    this.abrirModalEditarCliente(cliente);
  }

  filtrarClientes() {
    const filtro = this.busqueda.trim().toLowerCase();
    this.clientesFiltrados = this.clientes.filter(cliente => {
      const coincideTexto =
        (!filtro ||
          (cliente.nombre && cliente.nombre.toLowerCase().includes(filtro)) ||
          (cliente.email && cliente.email.toLowerCase().includes(filtro)) ||
          (cliente.telefono && cliente.telefono.toLowerCase().includes(filtro))
        );
      const coincideProvincia =
        (!this.provinciaSeleccionada ||
          cliente.provincia === this.provinciaSeleccionada);
      return coincideTexto && coincideProvincia;
    });
    this.cd.detectChanges();
  }
}
