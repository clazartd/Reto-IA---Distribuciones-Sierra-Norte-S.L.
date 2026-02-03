export interface Producto {
  id: string;
  nombre: string;
  descripcion: string | null;
  unidadMedida: string;
  precioReferencia: string | null;
  disponible: boolean;
  createdAt: Date;
}
