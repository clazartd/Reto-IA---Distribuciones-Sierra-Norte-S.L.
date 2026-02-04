export interface Producto {
  id: string;
  nombre: string;
  descripcion: string | null;
  unidadMedida: string;
  precioReferencia: number;
  disponible: boolean;
  createdAt: Date;
}
