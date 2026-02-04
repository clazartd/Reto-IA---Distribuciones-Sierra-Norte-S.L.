import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Pedido, Estado } from '../../../../core/models/pedido.model';
import { PedidosService } from '../../../../core/services/pedidos.service';
import { ClientesService } from '../../../../core/services/clientes.service';
import { Cliente } from '../../../../core/models/cliente.model';
import { AgregarPedidoButtonComponent } from '../../../../shared/components/agregar-pedido/agregar-pedido-button.component';
import { DecimalPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado-pedidos',
  standalone: true,
  imports: [AgregarPedidoButtonComponent, DecimalPipe, FormsModule, CommonModule],
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.scss'],
})
export class ListadoPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidosFiltrados: Pedido[] = [];
  busqueda: string = '';
  filtroEstado: string = '';
  loading = false;
  error: string | null = null;

  clientes: Cliente[] = [];
  clientesMap: Map<string, string> = new Map();

  constructor(
    private pedidosService: PedidosService,
    private clientesService: ClientesService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.loading = true;
    this.error = null;

    // Cargar clientes y luego pedidos.
    this.clientesService.getClientes().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
        this.clientesMap = new Map(clientes.map(c => [c.id, c.nombre]));
        this.cargarPedidos();
      },
      error: () => {
        this.clientes = [];
        this.clientesMap = new Map();
        this.error = 'Error al cargar clientes.';
        this.loading = false;
      }
    });
  }

  cargarPedidos() {
    this.pedidosService.getPedidos().subscribe({
      next: (res: Pedido[]) => {
        this.pedidos = res;
        this.filtrarPedidos();
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err: any) => {
        this.pedidos = [];
        this.pedidosFiltrados = [];
        this.loading = false;
        this.error = 'Error al cargar pedidos.';
      },
    });
  }

  filtrarPedidos() {
    let buscado = this.busqueda.trim().toLowerCase();
    this.pedidosFiltrados = this.pedidos.filter(p => {
      const nombreCliente = this.getClienteNombre(p.clienteId)?.toLowerCase() || '';
      const coincideBusqueda =
        !buscado ||
        (p.numeroPedido?.toString().toLowerCase().includes(buscado)) ||
        (p.clienteId?.toLowerCase().includes(buscado)) ||
        (nombreCliente.includes(buscado));
      const coincideEstado =
        !this.filtroEstado || (p.estado === this.filtroEstado);
      return coincideBusqueda && coincideEstado;
    });
  }

  onBusquedaChange() {
    this.filtrarPedidos();
  }
  onFiltroEstadoChange() {
    this.filtrarPedidos();
  }

  getClienteNombre(clienteId: string): string {
    return this.clientesMap.get(clienteId) || '';
  }

  getEstadoColor(estado: Estado): string {
    switch (estado) {
      case Estado.ENTREGADO:
        return 'success';
      case Estado.REPARTO:
        return 'primary';
      case Estado.CANCELADO:
        return 'danger';
      case Estado.PREPARACION:
        return 'warning';
      default:
        return 'secondary';
    }
  }
}
