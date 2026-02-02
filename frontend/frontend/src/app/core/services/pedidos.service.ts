import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Pedido } from '../models/pedido.model';

// Resumen utilizado en dashboard
export interface PedidosResumen {
  registrados: number;
  preparados: number;
  enReparto: number;
  entregados: number;
  cancelados: number;
}

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private readonly API_URL = '/api/pedidos'; // Ajustar si es necesario

  constructor(private http: HttpClient) {}

  createPedido(pedido: Pedido): Observable<any> {
    return this.http.post(this.API_URL, pedido);
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.API_URL);
  }

  // Mock para dashboard
  getPedidosResumen(): Observable<PedidosResumen> {
    // TODO: reemplazar esta lógica por una integración real en producción
    return of({
      registrados: 5,
      preparados: 2,
      enReparto: 3,
      entregados: 20,
      cancelados: 1
    });
  }
}
