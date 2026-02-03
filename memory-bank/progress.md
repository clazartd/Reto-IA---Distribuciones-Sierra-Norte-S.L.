# Progress

## What works
- Layout global: sidebar, navbar ancho total, experiencia SaaS moderna ya en todo el frontend.
- Scaffold y funcionalidad completa de módulo clientes (lazy, CRUD, permisos, filtrado, integration with pedidos).
- Scaffold completo y patrón documentado para módulo productos (estructura, modelo, permisos) — interface Producto (`id: string`) ya actualizada.
- Mock de autenticación y roles funcionando correctamente.
- Pedidos: alta, edición y tabla listada funcionando; solo pendiente la integración completa con selector de productos de servicio.
- Documentación y patrones de arquitectura de clientes y productos en memory bank.

## What's left to build
- Módulo productos: Implementar componentes (listado, alta, edición), productos.service.ts, CRUD e integración total UX/permiso.
- Integrar ProductService como fuente única de verdad en selector de productos en pedidos (no más entrada manual).
- Backend/data persistence real (por ahora, servicios/mock).
- Pruebas exhaustivas de acceso y permisos para todos los roles (especial atención rollen CRUD/lectura productos).
- Validación robusta en formularios y mensajes de error custom según contexto.
- Migrar/depreciar lógica residual de productos insertados manualmente en pedidos (asegurar solo relaciones referenciales).

## Current status
- Clientes módulo: 95% funcionalidad completa y aprobada (falta solo detalles correctivos/mantenimiento).
- Productos: requerimientos y diseño aprobados; implementación codificada parcialmente (modelo y memoria actualizada), falta scaffold del módulo/productService/componentes.
- Pedidos: CRUD tradicional operativo; requiere actualización de selectors para consumir ProductService/ClienteService únicamente.

## Known issues
- Posible legacy de entrada manual producto en edición/alta de pedidos (hay que sustituir por selector).
- Dependencias backend aún no disponibles; todo está en mock/localstorage 💾.
- Pendiente testeo multi-rol en vistas productos.

## Evolución de decisiones
- Consolidación de patrón Lazy, modular y basado en servicios para features.
- Centralización absoluta de CRUD/permiso en servicios y guards.
- Estructura consistente para features (clientes, productos) y documentación viva en memory-bank.

---
