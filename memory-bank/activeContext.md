# Active Context

## Foco actual

- Refactorización completa de la entidad Pedido para reflejar necesidades funcionales de negocio:
  - Ahora se usa:
    - `numeroPedido: string`
    - `clienteId: string`
    - `productos: Producto[]`
    - `fechaSolicitud: Date`
    - `fechaPrevistaEntrega: Date`
    - `estado: Estado` (enum)
    - `urgente: boolean`
    - `total: number`
  - `Estado` es un enum fuerte, utilizado tanto en modelo como en lógica UI.
  - Todos los filtros y visiones usan `EstadoKeys`, evitando arrays sueltos.
  - Tabla de frontend ampliada con todas las columnas relevantes y filtrado robusto.

- Eliminado todo vestigio de variable/plano "estadosUnicos". Los mocks y formularios usan la nueva estructura.

## Próximos pasos

- Extender consistencia al backend/API cuando esté disponible.
- Validar integridad de datos reales (ids, enum, fechas) en el flujo de integración.
- Vigilar y documentar cualquier evolución en los estados válidos solo ampliando el enum.

## Decisiones clave y learnings

- El tipado estricto con enums es fundamental para escalabilidad y refactor.
- Suprime el legacy anterior de arrays sueltos o literales de strings para los estados.
- Cualquier visualización depende desde ahora directamente del modelo y sus derivados tipados.
