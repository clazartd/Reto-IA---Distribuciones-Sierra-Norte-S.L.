export interface Cliente {
  id: string;
  nombre: string;
  email: string | null;
  telefono: string | null;
  direccion: string | null;
  provincia: string | null;
  codigoPostal: string | null;
  contacto: string | null;
  activo: boolean;
  createdAt: Date;
}
