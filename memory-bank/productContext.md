# Product Context

## Why This Project Exists
El proyecto nace para digitalizar y optimizar la gestión de pedidos, productos y clientes en Distribuciones Sierra Norte S.L., reemplazando métodos manuales y dispersos por una solución centralizada accesible a todo el equipo.

## Problems Addressed
- Dependencia de hojas de cálculo y comunicación informal, propensas a errores y falta de visibilidad.
- Pérdida de tiempo y eficiencia en la gestión manual de pedidos, clientes y productos.
- Dificultad para asociar pedidos a clientes o productos de forma segura y sin duplicidad.
- Falta de catálogo de productos centralizado y controlado, permitiendo actualmente alta/edición desestructurada o ad-hoc.
- Trazabilidad y seguimiento estructurado limitado para productos (stock, catálogo, referencias).
- Dificultad de uso para usuarios con bajo conocimiento tecnológico.
- Imposibilidad de obtener métricas de negocio confiables o en tiempo real para analizar carga de trabajo, estado de pedidos, incidencia de urgentes, etc.

### Visualización en tiempo real y contexto administrativo
- La nueva arquitectura permite obtener en una sola pantalla (dashboard) todos los datos clave: total de pedidos, pendientes, entregados, cancelados, urgentes, etc., siempre actualizados desde backend.
- Permitir una vista de control viva facilita la toma de decisiones y reduce el “gap” operativo, evitando cualquier hardcodeo en datos de administración.

### Gestión de Productos: contexto particular
- Antes de este módulo, los productos se agregaban manualmente al registrar o editar pedidos, propiciando errores y falta de catálogo consistente.
- No había control granular de qué roles pueden crear, editar, borrar o solo consultar productos.
- Usuarios necesitaban una manera rápida de consultar el catálogo sin posibilidad de modificar registros no autorizados.

## User Experience Goals
- Experiencia clara y sumamente intuitiva, orientada a usuarios no técnicos.
- Interfaz visual simple, comprensible y enfocada en los procesos principales de negocio (gestión de pedidos, clientes y productos).
- Gestión de productos: listado tipo catálogo, alta/edición ultra simple, acciones claras según permisos, y selección de productos unificada en pedidos.
- Feedback inmediato y leyendas de permisos claros por rol (lectura/edición).
- Navegación fluida: los catálogos se consultan rápidamente y las acciones CRUD solo están expuestas a los roles permitidos.
- Selector de producto en el formulario de pedidos solo muestra productos existentes, evitando entradas manuales.
- Dashboard resumen: los indicadores de métricas deben ser siempre datos vivos, en tiempo real, obtenidos vía API, y nunca valores estáticos o simulados.

## Operational Context
- Uso diario por el equipo comercial, administración y otros roles con permisos definidos.
- Permite asociar pedidos a productos existentes controlados; elimina la entrada manual/libre de productos en pedidos.
- Listado y alta/edición/eliminación de productos accesible solo a los roles/usuarios permitidos; otros pueden consultar, pero no editar/borrar.
- Mejor trazabilidad y control; reducción del trabajo manual y errores administrativos.
- Accesible tanto desde oficina como dispositivos móviles, aunque la prioridad es entorno escritorio.
- El módulo de productos está integrado visual y funcionalmente con el resto de la aplicación.

---

> Este documento provee el contexto y motivaciones. Actualizar si cambian las necesidades, los problemas identificados o las metas de experiencia del usuario.
