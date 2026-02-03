import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Pedido, Estado } from '../models/pedido.model';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private readonly API_URL = '/api/pedidos';

  private productosMock: Producto[] = [
    {
      id: '1',
      nombre: 'Cerveza Artesanal',
      descripcion: 'Pack 6x33cl de IPA artesanal',
      unidadMedida: 'caja',
      precioReferencia: '14.99',
      disponible: true,
      createdAt: new Date(),
    },
    {
      id: '2',
      nombre: 'Agua Mineral',
      descripcion: 'Botella 1.5L',
      unidadMedida: 'unidad',
      precioReferencia: '0.70',
      disponible: true,
      createdAt: new Date(),
    },
    {
      id: '3',
      nombre: 'Aceite de Oliva Virgen',
      descripcion: 'Garrafa 5L extracción en frío',
      unidadMedida: 'garrafa',
      precioReferencia: '28.00',
      disponible: true,
      createdAt: new Date(),
    },
    {
      id: '4',
      nombre: 'Jamón Ibérico',
      descripcion: 'Pieza entera aprox. 7kg',
      unidadMedida: 'pieza',
      precioReferencia: '110.50',
      disponible: false,
      createdAt: new Date(),
    }
  ];

  constructor(private http: HttpClient) {}

  createPedido(pedido: Pedido): Observable<any> {
    return this.http.post(this.API_URL, pedido);
  }

  getPedidos(): Observable<Pedido[]> {
    return of([
      {
        id: 1,
        numeroPedido: 'N-202601-0001',
        clienteId: 'C-01',
        productos: [this.productosMock[0], this.productosMock[1]],
        fechaSolicitud: new Date('2026-02-10'),
        fechaPrevistaEntrega: new Date('2026-02-12'),
        estado: Estado.REGISTRADO,
        urgente: false,
        total: 15.69
      },
      {
        id: 2,
        numeroPedido: 'N-202601-0002',
        clienteId: 'C-02',
        productos: [this.productosMock[2]],
        fechaSolicitud: new Date('2026-02-11'),
        fechaPrevistaEntrega: new Date('2026-02-14'),
        estado: Estado.PREPARACION,
        urgente: true,
        total: 28.00
      },
      {
        id: 3,
        numeroPedido: 'N-202601-0003',
        clienteId: 'C-03',
        productos: [this.productosMock[3]],
        fechaSolicitud: new Date('2026-02-09'),
        fechaPrevistaEntrega: new Date('2026-02-19'),
        estado: Estado.CANCELADO,
        urgente: false,
        motivoCancelacion: 'Cliente lo solicitó',
        total: 110.50
      }
    ]);
  }

  updatePedido(id: number, pedido: Pedido): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, pedido);
  }

  cancelPedido(id: number, motivo: string): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}/cancelar`, { motivo });
  }

  prepararPedido(id: number): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}/preparar`, {});
  }
}
