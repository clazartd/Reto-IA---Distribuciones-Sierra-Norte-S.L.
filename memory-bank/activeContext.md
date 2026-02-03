# Active Context

## Últimos cambios implementados

- Layout global (sidebar, navbar) actualizado para vista moderna, experiencia full-width y navegación lateral consistente en todas las pantallas.
- Eliminación definitiva del antiguo menu-component y refactor de dashboard para respetar layout actual.
- Migración a patrones SaaS modernos (navbar ancho total, user dropdown).
- Eliminado preparacion-pedidos: Acciones de preparación y edición unificadas bajo listado-pedidos según rol.

---

## NUEVO: Funcionalidad Gestión de Productos

- Definida la estructura para el módulo productos (feature lazy-loaded, paths, archivos core).
- Requisitos y restricciones de roles aprobados:
  - Comercial, Administración, Dirección, Almacén pueden crear, editar, borrar y ver productos.
  - Reparto: solo puede consultar.
- Interface Producto actualizada (`id: string`) y documentada. Servicios mínimos definidos: getProductos, getProductoById, createProducto, updateProducto.
- Formulario de registro/edición de pedidos ya debe consumir ProductService como selector (evita entrada manual).
- Scaffold de archivos:
  - productos.module.ts
  - productos-routing.module.ts
  - pages/listado-productos/
  - pages/nuevo-producto/
  - pages/editar-producto/
- Columna de acciones visible solo según permisos; UX consistente con clientes/pedidos.
- Servicio ProductosService planificado, centralizará comunicación con backend.

---

## Funcionalidad Gestión de Clientes

- Módulo independiente, permisos activos según rol, integración con selector de clientes en pedidos.
- Mock data de clientes visible, buscador/filtrado avanzado, acciones condicionadas por permisos.

---

**Siguientes pasos:**
- Scaffold y codificación del módulo productos.
- Implementar ProductService, integración CRUD real.
- Integración total de selector de productos en formulario de pedidos.
- Test y validación UX+roles.
- Actualizar documentación técnica y evolutiva conforme avance la implementación.

---
