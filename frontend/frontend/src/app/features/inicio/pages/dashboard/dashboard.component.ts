import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionService } from '../../../../core/services/session.service';
import { PedidosService } from '../../../../core/services/pedidos.service';
import { Role } from '../../../../core/constants/roles.constants';
import { Estado } from '../../../../core/models/pedido.model';

interface UsuarioDashboard {
  nombre: string;
  rol: string;
}

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
  usuario: UsuarioDashboard = { nombre: '', rol: '' };
  resumen = {
    registrados: 0,
    preparados: 0,
    enReparto: 0,
    entregados: 0,
    cancelados: 0
  };
  loading = true;

  get esComercial(): boolean { return this.usuario.rol === Role.COMERCIAL; }
  get esAlmacen(): boolean { return this.usuario.rol === Role.ALMACEN; }
  get esReparto(): boolean { return this.usuario.rol === Role.REPARTO; }
  get esAdmin(): boolean { return this.usuario.rol === Role.ADMINISTRACION; }
  get esDireccion(): boolean { return this.usuario.rol === Role.DIRECCION; }

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
    this.pedidosService.getPedidos().subscribe({
      next: (pedidos) => {
        this.resumen = {
          registrados: pedidos.filter(p => p.estado === Estado.REGISTRADO).length,
          preparados: pedidos.filter(p => p.estado === Estado.PREPARACION).length,
          enReparto: pedidos.filter(p => p.estado === Estado.REPARTO).length,
          entregados: pedidos.filter(p => p.estado === Estado.ENTREGADO).length,
          cancelados: pedidos.filter(p => p.estado === Estado.CANCELADO).length
        };
        this.loading = false;
      },
      error: () => {
        this.resumen = { registrados: 0, preparados: 0, enReparto: 0, entregados: 0, cancelados: 0 };
        this.loading = false;
      }
    });
  }

  nuevoPedidoModalClosed(): void {}
}
