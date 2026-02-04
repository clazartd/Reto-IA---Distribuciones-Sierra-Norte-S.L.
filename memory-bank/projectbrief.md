# Project Brief

## Purpose
Digitalizar, centralizar y optimizar la gestión de pedidos, clientes y productos en Distribuciones Sierra Norte S.L., eliminando trabajos manuales y ofreciendo trazabilidad, eficiencia, acceso controlado y métricas en tiempo real.

## Goals
- Acceso seguro a paneles y listados según reglas de negocio y rol.
- Gestión unificada de pedidos (registro, consulta, edición, distribución, supervisión).
- **Gestión de Clientes:** listado, alta, edición y consulta de información de clientes, integración con módulo de pedidos.
- Permisos personalizados por rol sobre gestión de clientes: comercial/administración/dirección (edición), almacén/reparto (solo lectura).
- **Reporting tablero:** Todas las métricas resumen (cards/dashboard) se mostrarán siempre como datos vivos consultando la API en tiempo real (ej: total pedidos, pendientes, entregados, urgentes...), nunca mocks ni derivados locales.
- Experiencia visual clara y sencilla para usuarios no técnicos.
- Separación estricta de lógica, presentación y acceso.

## Gestión de Productos (Nuevo módulo)
- **Módulo independiente y lazy‑loaded**
- Listado, alta, edición y eliminación básica de productos
- Solo pueden crear/editar/eliminar productos: Comercial, Administración, Dirección, Almacén
- Reparto solo puede ver el catálogo/listado
- Selector de productos unificado: seleccionar productos desde el formulario de pedidos consultando el catálogo; no hay entrada manual/texto libre
- Servicio centralizado (ProductosService) con métodos mínimos: getProductos, getProductoById, createProducto, updateProducto
- Interfaz Producto (modelo): id: string, nombre, descripcion, unidadMedida, precioReferencia, disponible, createdAt
- Acciones permitidas y visibles dependen del rol
- Integrado con registro y edición de pedidos

## Scope
Incluye:
- Pedido: todo su ciclo, con filtros y dashboards de seguimiento.
- Cliente: listado completo, alta, edición, consulta detalle, acceso e integración con pedidos.
- Producto: catálogo, alta/edición/eliminación simple, selección desde pedidos, integración total con pedidos.
- **Dashboard/reporting**: visualización y métricas siempre en vivo vía API.
- Control de roles/autenticación (mocked; sin backend real inicial).
- Layout visual basado en SaaS moderno (sidebar global, navbar, feedback de acceso).
- Arquitectura modular Angular, todos los módulos funcionales lazy-loaded.
- **Relación pedidos-clientes:** pedidos solo permiten vincular a clientes existentes registrados.
No incluye:
- Histórico completo de cambios de clientes.
- Gestión avanzada de historiales/auditoría.
- Validación de negocio compleja o específica de backend.

## Key Stakeholders
- Dirección general
- Equipo Comercial
- Administración
- Almacén
- Reparto

---

> This document shapes all others.  
> **Keep updated as project scope, requirements, or goals change.**
