# Active Context

## Últimos cambios implementados

- Homogeneización visual "Preparación de pedidos" = "Listado de pedidos" + filtro UX alineado.
- Feedback: navbar requiere cambio de presentación: ocupar todo el ancho y usar dropdown de usuario en vez de texto plano de rol.
- Task pendiente: refactor navbar/layout conforme UX guidelines modernas.

---

## Nuevo requerimiento de Navbar:

- El navbar debe ocupar 100% del ancho de pantalla (no layout en columna).
- En vez de mostrar "Rol: ..." y botón de salir lineal:
  - Mostrar icono usuario/avatar (derecha, visible always).
  - Al hacer click: dropdown que indica usuario y rol activo, y muestra botón logout (con símbolo, no texto plano).
- El patrón será obligatorio para toda la experiencia autenticada.

---

## Siguientes pasos

- Refactor del componente de navbar/menu para arquitectura a ancho completo.
- Rediseño de área sesión, adoption de iconos y dropdown.
- Alinear experiencia a apps SaaS/admin modernas.

---
