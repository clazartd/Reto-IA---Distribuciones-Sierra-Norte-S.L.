import { Producto } from './producto.model';

// Enum fuerte y reutilizable para los estados de pedido
export enum Estado {
  REGISTRADO = 'registrado',
  PREPARACION = 'en preparación',
  REPARTO = 'en reparto',
  ENTREGADO = 'entregado',
  CANCELADO = 'cancelado'
}

export interface Pedido {
  id: number;
  numeroPedido: string;
  clienteId: string;
  productos: Producto[];
  fechaSolicitud: Date;
  fechaPrevistaEntrega: Date;
  estado: Estado;
  urgente: boolean;
  motivoCancelacion?: string;
  total: number;
}
