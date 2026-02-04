import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionService } from '../../../../core/services/session.service';
import { PedidosService } from '../../../../core/services/pedidos.service';
import { Role } from '../../../../core/constants/roles.constants';
import { Estado } from '../../../../core/models/pedido.model';
import { User } from '../../../../core/models/user.model'; // import correcto

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class DashboardComponent implements OnInit {
  usuario: User | null = null;
  resumen = {
    registrados: 0,
    preparados: 0,
    enReparto: 0,
    entregados: 0,
    cancelados: 0
  };
  loading = true;

  isLoadingEstados = true;
  distribucionPorEstado: { [estado: string]: number } = {};
  totalEstadosPedidos = 0;
  estadosPedidos = Object.values(Estado); // Enum Estado como fuente de verdad

  get esComercial(): boolean { return this.usuario?.role === Role.COMERCIAL; }
  get esAlmacen(): boolean { return this.usuario?.role === Role.ALMACEN; }
  get esReparto(): boolean { return this.usuario?.role === Role.REPARTO; }
  get esAdmin(): boolean { return this.usuario?.role === Role.ADMINISTRACION; }
  get esDireccion(): boolean { return this.usuario?.role === Role.DIRECCION; }

  constructor(
    private sessionService: SessionService,
    private pedidosService: PedidosService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.usuario = this.sessionService.getSession();
    this.fetchResumen();
  }

  fetchResumen() {
    this.loading = true;
    this.isLoadingEstados = true;
    this.pedidosService.getPedidos().subscribe({
      next: (pedidos) => {
        this.resumen = {
          registrados: pedidos.filter(p => p.estado === Estado.REGISTRADO).length,
          preparados: pedidos.filter(p => p.estado === Estado.PREPARACION).length,
          enReparto: pedidos.filter(p => p.estado === Estado.REPARTO).length,
          entregados: pedidos.filter(p => p.estado === Estado.ENTREGADO).length,
          cancelados: pedidos.filter(p => p.estado === Estado.CANCELADO).length
        };

        this.distribucionPorEstado = {
          REGISTRADO: pedidos.filter(p => p.estado === Estado.REGISTRADO).length,
          PREPARACION: pedidos.filter(p => p.estado === Estado.PREPARACION).length,
          REPARTO: pedidos.filter(p => p.estado === Estado.REPARTO).length,
          ENTREGADO: pedidos.filter(p => p.estado === Estado.ENTREGADO).length,
          CANCELADO: pedidos.filter(p => p.estado === Estado.CANCELADO).length,
        };
        this.totalEstadosPedidos = pedidos.length;
        this.isLoadingEstados = false;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.resumen = { registrados: 0, preparados: 0, enReparto: 0, entregados: 0, cancelados: 0 };
        this.distribucionPorEstado = {
          REGISTRADO: 0,
          PREPARACION: 0,
          REPARTO: 0,
          ENTREGADO: 0,
          CANCELADO: 0
        };
        this.totalEstadosPedidos = 0;
        this.isLoadingEstados = false;
        this.loading = false;
      }
    });
  }

  getPorcentajeEstado(estado: string): number {
    if (!this.totalEstadosPedidos || !this.distribucionPorEstado[estado]) {
      return 0;
    }
    return (this.distribucionPorEstado[estado] / this.totalEstadosPedidos) * 100;
  }

  nuevoPedidoModalClosed(): void {}
}
