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

  // TODO: Reemplazar con llamada real al backend cuando esté disponible
  getPedidos(): Observable<Pedido[]> {
    // return this.http.get<Pedido[]>(this.API_URL);
    return of([
      {
        id: 1,
        cliente: 'Pepe Gómez',
        productos: [
          { producto: 'Manzanas', cantidad: 5 },
          { producto: 'Peras', cantidad: 3 }
        ],
        fechaPrevistaEntrega: '2026-02-12',
        estado: 'registrado'
      },
      {
        id: 2,
        cliente: 'María Pérez',
        productos: [
          { producto: 'Plátanos', cantidad: 4 }
        ],
        fechaPrevistaEntrega: '2026-02-14',
        estado: 'preparado'
      },
      {
        id: 3,
        cliente: 'Juan Ruiz',
        productos: [
          { producto: 'Naranjas', cantidad: 7 },
          { producto: 'Manzanas', cantidad: 2 }
        ],
        fechaPrevistaEntrega: '2026-02-13',
        estado: 'enReparto'
      },
      {
        id: 4,
        cliente: 'Lucía Torres',
        productos: [
          { producto: 'Peras', cantidad: 6 }
        ],
        fechaPrevistaEntrega: '2026-02-13',
        estado: 'entregado'
      },
      {
        id: 5,
        cliente: 'Carlos González',
        productos: [
          { producto: 'Manzanas', cantidad: 10 }
        ],
        fechaPrevistaEntrega: '2026-02-15',
        estado: 'cancelado',
        motivoCancelacion: 'Cliente lo solicitó'
      }
    ]);
  }

  updatePedido(id: number, pedido: Pedido): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, pedido);
  }

  cancelPedido(id: number, motivo: string): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}/cancelar`, { motivo });
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
