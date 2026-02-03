# Tech Context

## Modelos de dominio principales

- **Producto**: definido en `producto.model.ts`.
- **Pedido**: definido en `pedido.model.ts`,
  - `id: number`
  - `numeroPedido: string`
  - `clienteId: string`
  - `productos: Producto[]`
  - `fechaSolicitud: Date`
  - `fechaPrevistaEntrega: Date`
  - `estado: Estado` (enum)
  - `urgente: boolean`
  - `motivoCancelacion?: string`
  - `total: number`

- **Enum Estado**:
  ```ts
  export enum Estado {
    REGISTRADO = 'registrado',
    PREPARACION = 'en preparación',
    REPARTO = 'en reparto',
    ENTREGADO = 'entregado',
    CANCELADO = 'cancelado'
  }
  ```

## Consistencia tipado y migración

- El tipo `Estado` sustituye cualquier array de strings o cadenas sueltas para el tracking de estado.
- Los formularios, mocks, fixtures y servicios deben trabajar con la nueva estructura obligatoriamente.
- El filtrado de pedidos por estado se implementa mediante `Object.values(Estado)` accedido como `EstadoKeys` en el componente.
- La propiedad `urgente` se muestra siempre como boolean visible ("Sí"/"No").

## Notas de migración

- Eliminada la variable `estadosUnicos`, el filtering y la UI dependen 100% del enum.
- Todos los features presentes y futuros deben acatar el tipado estricto, la creación de mocks y la extensión funcional sólo desde aquí y systemPatterns.
