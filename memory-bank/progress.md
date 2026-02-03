# Progress

## Cambios recientes

- Refactorización mayor de Pedido:
  - Añadidos y documentados los nuevos campos (`numeroPedido`, `clienteId`, `productos`, `fechaSolicitud`, `estado`, `urgente`, `total`)
  - `estado` implementado como enum fuerte y referenciado en toda la lógica frontend (filtrado, tabla, UI).
  - Todos los mocks y la tabla visual se han ampliado al nuevo modelo de datos.
  - Eliminada variable legacy `estadosUnicos` y cualquier string suelto para estados.
  - Filtro de estado basado en Object.values(Estado) (`EstadoKeys`).
- Documentados patrones y convenciones en systemPatterns.md, techContext.md, y el foco en activeContext.md.

## Estado actual

- El listado de pedidos en frontend se ajusta completamente al nuevo modelo.
- El filtro, la visualización y la estructura de código son extensibles y robustos.
- La documentación técnica y de proyecto está alineada y completa.

## Siguientes pasos

- Propagar el modelo extendido al resto del frontend, validar formularios y detalles.
- Definir mapeos/mocks intermedios para consumir datos reales del backend cuando esté disponible.
- Monitorizar cualquier salto de requisitos sobre los campos del modelo Pedido y reflejarlo instantáneamente en la documentación central.

## Decisión clave

- El uso de enums y tipado estricto mejora la mantenibilidad, la robustez y la comprensión colectiva del sistema.
