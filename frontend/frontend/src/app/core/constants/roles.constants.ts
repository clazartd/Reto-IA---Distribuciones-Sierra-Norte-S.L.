/**
 * ROLES: Constantes para los distintos perfiles permitidos en la aplicación.
 * Inmutable y centralizado para uso en autenticación, guards y validaciones frontend.
 */
export const ROLES = Object.freeze({
  DIRECCION: 'DIRECCION',
  COMERCIAL: 'COMERCIAL',
  ALMACEN: 'ALMACEN',
  REPARTO: 'REPARTO',
  ADMINISTRACION: 'ADMINISTRACION',
});
