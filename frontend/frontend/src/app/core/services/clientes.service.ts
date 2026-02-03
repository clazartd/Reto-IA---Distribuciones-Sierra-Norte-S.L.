import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class ClientesService {
  // Mock: datos iniciales simulados
  private clientes: Cliente[] = [
    {
      id: 1,
      nombre: 'Empresa Ejemplo S.L.',
      email: 'contacto@ejemplo.com',
      telefono: '600600600',
      direccion: 'Calle Principal 1',
      provincia: 'Madrid',
      codigoPostal: '28001',
      contacto: 'Juan Pérez',
      activo: true,
      createdAt: new Date()
    }
  ];

  getClientes(): Observable<Cliente[]> {
    return of(this.clientes);
  }

  getClienteById(id: number): Observable<Cliente | undefined> {
    return of(this.clientes.find(c => c.id === id));
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    const newCliente = { ...cliente, id: Date.now(), createdAt: new Date() };
    this.clientes.push(newCliente);
    return of(newCliente);
  }

  updateCliente(id: number, cliente: Cliente): Observable<Cliente | undefined> {
    const idx = this.clientes.findIndex(c => c.id === id);
    if (idx !== -1) {
      this.clientes[idx] = { ...this.clientes[idx], ...cliente };
      return of(this.clientes[idx]);
    }
    return of(undefined);
  }
}
