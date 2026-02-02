# Progress

## Qué funciona

- El menú superior es claro y sin dropdown confuso: "Pedidos" es sólo un link directo.
- Listado de pedidos tiene botón "+ Agregar nuevo pedido" visible sólo para rol COMERCIAL.
- SessionService y guards controlan visibilidad/seguridad.
- Rutas `/pedidos` redirecciona correctamente a `/pedidos/listado`.
- Todos los accesos y botones respetan roles y experiencia esperada.

## Qué falta por construir / próximo objetivo

### Pantalla de Inicio personalizada por rol ("Dashboard")
**Pendiente de implementar:**  
- Nueva pantalla central tras login en `src/app/features/inicio/pages/dashboard/`.
- Encabezado fijo con:
  - Nombre sistema (“Gestión de Pedidos – Distribuciones Sierra Norte”)
  - Nombre y rol del usuario.
- Bloque principal: resumen contadores de pedidos (por estado: Registrados, Preparados, En reparto, Entregados, Cancelados), gráficos amigables.
- Bloques y accesos adaptativos por rol:
  - **COMERCIAL:** Resumen global, botón "Nuevo pedido", acceso a "Pedidos Registrados", aviso por pedidos sin preparar.
  - **ALMACÉN:** Pendientes de preparar, acceso "Preparar pedidos", aviso destacado si los hay.
  - **REPARTO:** Pedidos en reparto, acceso a "Confirmar entrega", aviso si hay pendientes.
  - **ADMINISTRACIÓN:** Sólo consulta/histórico/soporte.
  - **DIRECCIÓN:** Resumen global, acceso a consulta/histórico.
- Acciones rápidas (botones, no edición directa).
- No mostrar acciones fuera del perfil.

**Tecnología/servicios a usar:**
- SessionService (usuario, rol)
- PedidosService (resúmenes, contadores)
- UI modular, user-friendly, clara.

### Estado general
- Arquitectura robusta y alineada a patrones Memory Bank.
- Últimos cambios consolidados, ready para iteración sobre Dashboard adaptativo.
