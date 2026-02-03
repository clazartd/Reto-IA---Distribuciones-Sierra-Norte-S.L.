# System Patterns

## Dominio y Modelos Compartidos

- **Pedido**
  - `id: number`
  - `numeroPedido: string`
  - `clienteId: string`
  - `productos: Producto[]`
  - `fechaSolicitud: Date`
  - `fechaPrevistaEntrega: Date`
  - `estado: Estado`  // Enum fuerte: 'registrado' | 'en preparación' | 'en reparto' | 'entregado' | 'cancelado'
  - `urgente: boolean`
  - `motivoCancelacion?: string`
  - `total: number`

- **Enum Estado**  
  ```ts
  export enum Estado {
    REGISTRADO = 'registrado',
    PREPARACION = 'en preparación',
    REPARTO = 'en reparto',
    ENTREGADO = 'entregado',
    CANCELADO = 'cancelado'
  }
  ```

## Relación y convenciones

- Los pedidos deben almacenar referencia lógica a cliente/usuario mediante `clienteId`, el detalle visual puede ser resuelto por join con la entidad Cliente.
- El valor total se maneja como decimal/float JS (`number`), siempre calculado como suma de líneas de productos en ese pedido.
- La única fuente de verdad de "estado" es el enum Estado, nunca un string literal suelto ni un array plano.
- El filtrado por estado y la visualización siempre deben derivarse de EstadoKeys o recorrido de Object.values(Estado).

## Nota de Consistencia

- Todas las visiones, formularios, pipes y lógicas deben actualizarse para usar la nueva interfaz.
- Eliminar uso de "estadosUnicos" u otros patrones legacy donde existieran, y basarse en el enum.
- Cualquier evolución posterior debe extender Estado solo aquí y en el modelo.
