import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido, Estado } from '../models/pedido.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private readonly apiUrl = `${environment.apiUrl}/pedidos`;

  constructor(private http: HttpClient) {}

  getPedidos(filtros?: {estado?: Estado, clienteId?: string}): Observable<Pedido[]> {
    let params = new HttpParams();
    if (filtros) {
      if (filtros.estado) params = params.set('estado', filtros.estado);
      if (filtros.clienteId) params = params.set('clienteId', filtros.clienteId);
    }
    return this.http.get<Pedido[]>(this.apiUrl, { params });
  }

  getPedidoById(id: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  createPedido(pedido: Partial<Pedido>): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }

  updatePedido(id: string, pedido: Partial<Pedido>): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${id}`, pedido);
  }

  cancelPedido(id: string, motivo: string): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${id}/cancelar`, { motivo });
  }
}
