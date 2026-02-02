import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosService } from '../../../../core/services/pedidos.service';
import { Pedido } from '../../../../core/models/pedido.model';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { SessionService } from '../../../../core/services/session.service';
import { ROLES } from '../../../../core/constants/roles.constants';
import { NuevoPedidoComponent } from '../nuevo-pedido/nuevo-pedido.component';
import { AgregarPedidoButtonComponent } from '../../../../shared/components/agregar-pedido-button.component';
import { EditarPedidoComponent } from '../../../../shared/components/editar-pedido.component';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal.component';

@Component({
  standalone: true,
  selector: 'app-listado-pedidos',
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NuevoPedidoComponent,
    AgregarPedidoButtonComponent,
    EditarPedidoComponent,
    ConfirmModalComponent
  ],
})
export class ListadoPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  filteredPedidos: Pedido[] = [];
  filtroEstado: string = '';
  filtroFecha: string = '';
  estadosUnicos: string[] = [];

  loading = true;
  error: string | null = null;

  @ViewChild('nuevoPedidoModal') nuevoPedidoModal!: NuevoPedidoComponent;
  @ViewChild('editarPedidoModal') editarPedidoModal!: EditarPedidoComponent;

  selectedPedidoToEdit: Pedido | null = null;
  selectedPedidoToCancel: Pedido | null = null;
  showCancelConfirm = false;

  constructor(
    private pedidosService: PedidosService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.fetchPedidos();
  }

  fetchPedidos(): void {
    this.loading = true;
    this.error = null;
    this.pedidosService.getPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.estadosUnicos = Array.from(new Set(data.map(p => p.estado)));
        this.filtrar();
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los pedidos';
        this.loading = false;
      }
    });
  }

  filtrar(): void {
    this.filteredPedidos = this.pedidos.filter(p =>
      (!this.filtroEstado || p.estado === this.filtroEstado) &&
      (!this.filtroFecha || p.fechaPrevistaEntrega === this.filtroFecha)
    );
  }

  get esComercial(): boolean {
    return this.sessionService.getUserRole() === ROLES.COMERCIAL;
  }

  abrirNuevoPedidoModal(): void {
    this.nuevoPedidoModal.open();
  }

  abrirEditarPedidoModal(pedido: Pedido): void {
    this.selectedPedidoToEdit = pedido;
    setTimeout(() => this.editarPedidoModal.open(pedido), 0);
  }

  onPedidoEdit(updatedPedido: Pedido): void {
    this.pedidosService.updatePedido(updatedPedido).subscribe(() => {
      const idx = this.pedidos.findIndex(p => p.id === updatedPedido.id);
      if (idx !== -1) {
        this.pedidos[idx] = { ...updatedPedido };
        this.filtrar();
      }
    });
  }

  abrirCancelarPedidoConfirm(pedido: Pedido): void {
    this.selectedPedidoToCancel = pedido;
    this.showCancelConfirm = true;
  }

  confirmarCancelarPedido(): void {
    if (!this.selectedPedidoToCancel) return;
    this.pedidosService.cancelPedido(this.selectedPedidoToCancel.id).subscribe(() => {
      const idx = this.pedidos.findIndex(p => p.id === this.selectedPedidoToCancel!.id);
      if (idx !== -1) {
        this.pedidos[idx] = { ...this.pedidos[idx], estado: 'cancelado' };
        this.filtrar();
        this.selectedPedidoToCancel = null;
        this.showCancelConfirm = false;
      }
    });
  }

  cancelarCancelarPedido(): void {
    this.selectedPedidoToCancel = null;
    this.showCancelConfirm = false;
  }

  // Optionally, handle the (closed) output event if needed
  nuevoPedidoModalClosed(): void {}
}
