export enum Estado {
  REGISTRADO = 'REGISTRADO',
  PREPARACION = 'PREPARACION',
  REPARTO = 'REPARTO',
  ENTREGADO = 'ENTREGADO',
  CANCELADO = 'CANCELADO'
}

export interface ProductoBasico {
  idProducto: string;
  cantidad: number;
}

export interface Pedido {
  id: string;
  numeroPedido: string;
  clienteId: string;
  productos: ProductoBasico[];
  fechaSolicitud: Date;
  fechaPrevistaEntrega: Date;
  estado: Estado;
  urgente: boolean;
  motivoCancelacion?: string;
  total: number;
}
