export interface PedidoProducto {
  producto: string;
  cantidad: number;
}

export interface Pedido {
  id: number;
  cliente: string;
  productos: PedidoProducto[];
  fechaPrevistaEntrega: string; // ISO format (YYYY-MM-DD)
  estado: string;
  motivoCancelacion?: string;
}
