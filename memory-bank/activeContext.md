# Active Context

## Últimos cambios implementados

- Implementada navegación condicional y arquitectura para funcionalidad exclusiva de preparación de pedidos (rol ALMACÉN), con nuevo route guard y menú contextualizado.
- Menú Pedidos ahora incluye la opción "Preparación de pedidos" solo visible si el user es ALMACÉN.
- Componente preparación standalone, servicio dedicado para prepararPedido y patrón modal uniforme.

---

## Flujo correctivo para Preparación de pedidos (ALMACÉN)

### Flujo esperado:
1. El personal de almacén accede a Pedidos → Preparación.
2. Visualiza la lista de pedidos pendientes (solo “registrados”).
3. Selecciona uno y pulsa “Marcar como preparado”.
4. El sistema actualiza el estado del pedido a “Preparado”, muestra confirmación clara.
5. El pedido desaparece de la lista de pendientes (permanece en la misma pantalla, solo lista actualizada).
6. No hay redirección automática al listado general ni navegación a otra vista tras preparar; el usuario sigue en preparación operando.

---

## Criterios UX nuevos (por feedback)

- **Homogeneidad visual:** La pantalla de preparación de pedidos DEBE emplear exactamente los mismos estilos, estructura, alerts y layout que la de listado de pedidos. Incluye tabla responsiva, alerts superiores, paddings, etc.
- **Nuevos filtros:** Añadir sección de filtros en cabecera (igual que el listado) para poder buscar por “cliente” y “fecha prevista de entrega”. Campo select (cliente) y date, con botón limpiar y lógica reactiva.
- **Patrón:** Los filtros deben funcionar igual (UX, placement, feedback) que en listado.

---

## Incidencias y mejoras en curso

- Falta de homogeneidad visual detectada.
- Falta de filtros: la pantalla debería permitir filtrar, por UX y para agilidad operativa.
- Siguiente paso: Unificar estilos y llevar el bloque de filtros (con lógica) a preparacion-pedidos.

---
