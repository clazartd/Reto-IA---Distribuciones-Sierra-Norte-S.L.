import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../../../core/services/session.service';
import { User } from '../../../../core/models/user.model';
import { Role } from '../../../../core/constants/roles.constants';
import { Pedido, Estado } from '../../../../core/models/pedido.model';

@Component({
  selector: 'app-listado-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.scss']
})
export class ListadoPedidosComponent {
  user: User | null = null;

  filtroEstado: Estado | '' = '';
  filtroFecha: string = '';

  pedidos: Pedido[] = [
    {
      id: 1,
      numeroPedido: 'N-202601-0001',
      clienteId: 'C-01',
      productos: [],
      fechaSolicitud: new Date('2026-02-10'),
      fechaPrevistaEntrega: new Date('2026-02-12'),
      estado: Estado.REGISTRADO,
      urgente: false,
      total: 32.5
    },
    {
      id: 2,
      numeroPedido: 'N-202601-0002',
      clienteId: 'C-02',
      productos: [],
      fechaSolicitud: new Date('2026-02-11'),
      fechaPrevistaEntrega: new Date('2026-02-14'),
      estado: Estado.PREPARACION,
      urgente: true,
      total: 19
    },
    {
      id: 3,
      numeroPedido: 'N-202601-0003',
      clienteId: 'C-03',
      productos: [],
      fechaSolicitud: new Date('2026-02-09'),
      fechaPrevistaEntrega: new Date('2026-02-19'),
      estado: Estado.CANCELADO,
      urgente: false,
      motivoCancelacion: 'Cliente lo solicitó',
      total: 0
    }
  ];

  filteredPedidos: Pedido[] = [];
  loading = false;
  error = '';
  showCancelConfirm = false;
  selectedPedidoToEdit: Pedido | null = null;
  selectedPedidoToCancel: Pedido | null = null;

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.user = this.sessionService.getSession();
    this.filtrar();
  }

  get puedeCrearPedido(): boolean {
    return !!this.user && [
      Role.DIRECCION,
      Role.COMERCIAL,
      Role.ADMINISTRACION
    ].includes(this.user.role);
  }

  get puedeEditarPedido(): boolean {
    return !!this.user && [
      Role.DIRECCION,
      Role.COMERCIAL,
      Role.ADMINISTRACION
    ].includes(this.user.role);
  }

  filtrar() {
    this.filteredPedidos = this.pedidos.filter(p =>
      (this.filtroEstado === '' || p.estado === this.filtroEstado) &&
      (this.filtroFecha === '' || this.formatFecha(p.fechaPrevistaEntrega) === this.filtroFecha)
    );
  }

  private formatFecha(fecha: Date): string {
    return fecha.toISOString().split('T')[0];
  }

  abrirNuevoPedidoModal() {}
  abrirEditarPedidoModal(pedido: Pedido) { this.selectedPedidoToEdit = pedido; }
  abrirCancelarPedidoConfirm(pedido: Pedido) { this.selectedPedidoToCancel = pedido; this.showCancelConfirm = true; }
  confirmarCancelarPedido() { this.showCancelConfirm = false; }
  cancelarCancelarPedido() { this.selectedPedidoToCancel = null; this.showCancelConfirm = false; }
  nuevoPedidoModalClosed() {}
  onPedidoEdit(pedido: Pedido) { this.selectedPedidoToEdit = null; }

  get EstadoKeys(): string[] {
    return Object.values(Estado);
  }
}
