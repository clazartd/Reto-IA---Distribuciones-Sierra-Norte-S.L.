import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidosService } from '../../../../core/services/pedidos.service';
import { Pedido } from '../../../../core/models/pedido.model';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  standalone: true,
  selector: 'app-preparacion-pedidos',
  templateUrl: './preparacion-pedidos.component.html',
  imports: [CommonModule, FormsModule, ConfirmModalComponent]
})
export class PreparacionPedidosComponent implements OnInit {
  pedidosRegistrados: Pedido[] = [];
  filteredPedidos: Pedido[] = [];
  clientesUnicos: string[] = [];
  filtroCliente: string = '';
  filtroFechaPrevista: string = '';

  loading = true;
  error: string | null = null;

  showConfirm = false;
  pedidoSeleccionado: Pedido | null = null;
  successMsg: string | null = null;

  constructor(private pedidosService: PedidosService) {}

  ngOnInit() {
    this.loadPedidos();
  }

  loadPedidos() {
    this.loading = true;
    this.pedidosService.getPedidos().subscribe({
      next: pedidos => {
        this.pedidosRegistrados = pedidos.filter(p => p.estado === 'registrado');
        this.updateClientesUnicos();
        this.filtrar();
        this.loading = false;
        this.error = null;
      },
      error: () => {
        this.loading = false;
        this.error = 'No se pudieron cargar los pedidos';
        this.filteredPedidos = [];
      }
    });
  }

  updateClientesUnicos() {
    this.clientesUnicos = Array.from(
      new Set(this.pedidosRegistrados.map(p => p.cliente))
    );
  }

  filtrar() {
    this.filteredPedidos = this.pedidosRegistrados.filter(p => {
      const clienteOk = !this.filtroCliente || p.cliente === this.filtroCliente;
      const fechaOk = !this.filtroFechaPrevista || p.fechaPrevistaEntrega === this.filtroFechaPrevista;
      return clienteOk && fechaOk;
    });
  }

  limpiarFiltros() {
    this.filtroCliente = '';
    this.filtroFechaPrevista = '';
    this.filtrar();
  }

  abrirConfirmacionPreparar(pedido: Pedido) {
    this.pedidoSeleccionado = pedido;
    this.showConfirm = true;
  }

  cancelarPreparacion() {
    this.pedidoSeleccionado = null;
    this.showConfirm = false;
  }

  confirmarPreparacion() {
    if (!this.pedidoSeleccionado) return;
    this.pedidosService.prepararPedido(this.pedidoSeleccionado.id).subscribe({
      next: () => {
        this.successMsg = `Pedido #${this.pedidoSeleccionado?.id} marcado como preparado.`;
        // remove from both source and filtered
        this.pedidosRegistrados = this.pedidosRegistrados.filter(p => p.id !== this.pedidoSeleccionado?.id);
        this.filtrar();
        this.pedidoSeleccionado = null;
        this.showConfirm = false;
        setTimeout(() => this.successMsg = null, 2000);
      },
      error: () => {
        this.error = 'Ocurrió un error al preparar el pedido';
        this.showConfirm = false;
        this.pedidoSeleccionado = null;
      }
    });
  }
}
