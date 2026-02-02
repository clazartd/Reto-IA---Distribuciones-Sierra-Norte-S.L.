import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosService } from '../../../../core/services/pedidos.service';
import { Pedido } from '../../../../core/models/pedido.model';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { SessionService } from '../../../../core/services/session.service';
import { ROLES } from '../../../../core/constants/roles.constants';
import { NuevoPedidoComponent } from '../nuevo-pedido/nuevo-pedido.component';

@Component({
  standalone: true,
  selector: 'app-listado-pedidos',
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule, NuevoPedidoComponent],
})
export class ListadoPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  filteredPedidos: Pedido[] = [];
  filtroEstado: string = '';
  filtroFecha: string = '';
  estadosUnicos: string[] = [];

  loading = true;
  error: string | null = null;

  showNuevoPedidoModal = false;

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
    this.showNuevoPedidoModal = true;
  }

  cerrarNuevoPedidoModal(): void {
    this.showNuevoPedidoModal = false;
  }
}
