# System Patterns

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

(Otros patrones previos conservados…)
