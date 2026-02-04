# progress.md

## Estado actual

### Productos
- CRUD de producto activo y alineado en toda la plataforma.
- El campo precioReferencia está tipado en todas partes como number (NUMERIC en SQL/Postgres, number en modelos JS/backend y interface TS/frontend).
- Se eliminaron todos los mocks del frontend, los datos provienen 100% del backend.
- Se garantiza interoperabilidad DTO ↔ BD ↔ servicios sin conversiones de tipo ni bugs en el stack.
- El script db-init ya inicializa productos con precioReferencia como número (sin comillas).
- Todos los controladores y modelos de producto sólo exponen, almacenan y manipulan precioReferencia como número; si se recibe string se parsea pero no se persiste así.
- La memory bank documenta exhaustivamente el upgrade y el patrón a seguir para modelos futuros.

### Pedidos
- Listado de pedidos replica ya visual, estructura de filtros, y UX del listado de productos (cajas, badges, tabla responsive, conteos y filtros reactivos).
- Utiliza llamada a API de clientes para mapear en tiempo real el nombre del cliente, evitando dependencias de datos legacy o mocks.
- Implementado icono 🔴 "🚨" en columna "Urgente" según feedback, sólo para pedidos urgentes, sin ruido visual para el resto.
- Los estados de pedido están sincronizados estrictamente con el enum central: REGISTRADO, PREPARACION, REPARTO, ENTREGADO, CANCELADO. El filtrado y visualización responden 1:1 al model domain backend/TS.

## Pendiente

- Implementar test unitarios en backend (services, controllers, modelos, rutas API), usando Jest o Mocha, cubriendo flujos correctos (happy path) y validación de errores y edge cases.
- **Dashboard**:
  - Implementar que todas las cards de resumen de pedidos en dashboard (total pedidos, pendientes, entregados, reparto, cancelados…) consuman datos vivos consultando la API, nunca mocks.
  - Eliminar valores hardcodeados de métricas o estados en home/dashboard.
  - Añadir/ajustar servicios y lógica reactiva a estado de backend para todos los widgets de resumen.
- Si se encuentran asignaciones o inputs de precioReferencia como string en componentes de frontend, refactor directo del tipado (por ahora no se detectan).
- Mantener test y revisión constante de los endpoints cuando se migren datos legacy o se hagan integraciones externas.
