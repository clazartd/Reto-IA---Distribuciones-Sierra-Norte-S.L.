import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionService } from '../../../../core/services/session.service';
import { PedidosService } from '../../../../core/services/pedidos.service';
import { ROLES } from '../../../../core/constants/roles.constants';
import { AgregarPedidoButtonComponent } from '../../../../shared/components/agregar-pedido-button.component';
import { NuevoPedidoComponent } from '../../../pedidos/pages/nuevo-pedido/nuevo-pedido.component';

interface UsuarioDashboard {
  nombre: string;
  rol: string;
}

interface PedidosResumen {
  registrados: number;
  preparados: number;
  enReparto: number;
  entregados: number;
  cancelados: number;
}

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    AgregarPedidoButtonComponent,
    NuevoPedidoComponent
  ],
})
export class DashboardComponent implements OnInit {
  usuario: UsuarioDashboard = { nombre: '', rol: '' };
  resumen: PedidosResumen = { registrados: 0, preparados: 0, enReparto: 0, entregados: 0, cancelados: 0 };
  loading = true;

  @ViewChild('nuevoPedidoModal') nuevoPedidoModal!: NuevoPedidoComponent;

  // Controla el layout y accesos rápidos
  get esComercial(): boolean { return this.usuario.rol === ROLES.COMERCIAL; }
  get esAlmacen(): boolean { return this.usuario.rol === ROLES.ALMACEN; }
  get esReparto(): boolean { return this.usuario.rol === ROLES.REPARTO; }
  get esAdmin(): boolean { return this.usuario.rol === ROLES.ADMINISTRACION; }
  get esDireccion(): boolean { return this.usuario.rol === ROLES.DIRECCION; }

  constructor(
    private sessionService: SessionService,
    private pedidosService: PedidosService
  ) {}

  ngOnInit() {
    const user = this.sessionService.getSession();
    this.usuario = user
      ? { nombre: user.username, rol: user.role }
      : { nombre: '', rol: '' };
    this.fetchResumen();
  }

  fetchResumen() {
    this.loading = true;
    this.pedidosService.getPedidosResumen().subscribe({
      next: (data) => {
        this.resumen = data;
        this.loading = false;
      },
      error: () => {
        this.resumen = { registrados: 0, preparados: 0, enReparto: 0, entregados: 0, cancelados: 0 };
        this.loading = false;
      }
    });
  }

  abrirNuevoPedidoModal(): void {
    this.nuevoPedidoModal.open();
  }

  // Optionally, handle the (closed) output event if needed
  nuevoPedidoModalClosed(): void {}
}
