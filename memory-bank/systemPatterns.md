# System Patterns

## NUEVO Patrón: Módulo Gestión de Productos

- **Módulo Independiente, Lazy-Loaded:** Productos se implementa como módulo propio (`src/app/features/productos/`) y se carga bajo demanda por router/lazy.
- **Arquitectura CRUD:** Listado, alta, edición, (sin auditoría avanzada); componentes standalone en productos.module.
- **Permisos centralizados:** Acceso a edición/alta/eliminación solo para Comercial, Dirección, Administración y Almacén; Reparto solo lectura.
- **Protección por Guardia (RoleGuard):** Acceso a rutas y enlaces protegido por permisos declarativos y guards.
- **Service-First:** Toda comunicación con backend centralizada en ProductosService, sin lógica de negocio ni en componentes ni servicios.
  - Métodos: getProductos, getProductoById, createProducto, updateProducto.
- **Selector en Pedidos:** El formulario de pedido/edición usa un selector de productos que consume ProductosService (no entrada manual, no permite inventar productos).
- **ID de producto:** Ahora `id: string` en interface Producto y en todas sus relaciones.
- **Visual/UX:** El listado y formulario mantiene consistencia visual con módulos de clientes/pedidos; columna de acciones visible/oculta y con acciones CRUD dinámicas según permisos del usuario.
- **Reutilización:** El formulario de alta/edición se comparte cuando es posible reutilizar layout/detección de campos.

---

## Homogeneidad en pantallas de gestión de pedidos

- **Norma:** Todas las pantallas de gestión de pedidos (listado, preparación, histórico, etc.) deben compartir exactamente los mismos estilos visuales, estructura de layout, alerts, spacing y comportamiento de tabla (responsive, alineación, headers).
- **Patrón de filtros:** Si la pantalla muestra un listado de pedidos, debe incluir siempre sección superior de filtros por “cliente” y “fecha prevista”, con placement idéntico, UX reactiva y botón limpiar.
- **Racional:** Facilita el uso operativo, reduce curva de aprendizaje y minimiza errores de experiencia para el personal.
- **Aplica:** Listado de pedidos, Preparación de pedidos, futuros históricos o dashboards, etc.

---

## Navbar/Barra superior moderna estilo SaaS

- **Regla:** La barra superior ocupa 100% del ancho, sin columnas laterales residuales.
- **Zona usuario:** 
  - Siempre en esquina superior derecha, mostrar icono de usuario/avatar.
  - Dropdown contextual con info del usuario (nombre de usuario y rol).
  - Botón logout como icono, no texto plano.
- **NO:** No mostrar “Rol: ...” como texto flotante, ni botón salir directo.
- **Racional:** Uniformidad, familiaridad UX y estética moderna.
- **Extensión:** Todo el entorno autenticado usa el mismo patrón.

---

## NUEVO Patrón: Módulo Gestión de Clientes

- **Módulo Independiente, Lazy-Loaded:** Clientes se implementa como módulo propio y se carga bajo demanda por router/lazy.
- **Arquitectura CRUD:** Listado, alta, edición, detalle como componentes de página en declaración de clientes.module.
- **Permisos centralizados:** Acceso a edición/alta solo para Comercial, Dirección y Administración; Almacén y Reparto solo lectura.
- **Protección por Guardia (RoleGuard):** Acceso a rutas y enlaces protegido por permisos declarativos y guards.
- **Service-First:** Toda comunicación con backend (futuro) centralizada en ClienteService, sin lógica 'negocio' en componentes.
- **Integración:** Selector de clientes en alta de pedidos debe consumir ClienteService (sin entrada manual).
- **Visuales y UX:** Pantallas cliente mantienen consistencia visual absoluta con módulos de pedidos.
- **No histórico, no subcomponentes avanzados:** CRUD sencillo, directo y sin auditoría avanzada.

---

(Otros patrones previos conservados…)
