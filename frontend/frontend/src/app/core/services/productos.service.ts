import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private productos: Producto[] = [
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
  ];

  getProductos(): Observable<Producto[]> {
    return of([...this.productos]);
  }

  getProductoById(id: string): Observable<Producto | undefined> {
    return of(this.productos.find(p => p.id === id));
  }

  createProducto(producto: Producto): Observable<Producto> {
    const newProducto: Producto = {
      ...producto,
      id: String(Date.now()),
      createdAt: new Date()
    };
    this.productos.push(newProducto);
    return of(newProducto);
  }

  updateProducto(id: string, producto: Producto): Observable<Producto | undefined> {
    const idx = this.productos.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.productos[idx] = { ...producto, id, createdAt: this.productos[idx].createdAt };
      return of(this.productos[idx]);
    }
    return of(undefined);
  }
}
