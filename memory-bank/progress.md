# Progress

## Qué funciona

- Menú contextual por rol (Pedidos > Preparación disponible solo para ALMACÉN).
- Componentización y guards operando correctamente para cada pantalla de pedidos.
- Listado de pedidos pendientes (registrados) para preparar visible sólo a ALMACÉN.
- Servicio prepararPedido y feedback modal integrado.

---

## Flujo y UX de preparación de pedidos (ALMACÉN)

### Flujo válido:
- El usuario permanece siempre en pantalla "Preparación", nunca redirige tras preparar.
- La lista se actualiza localmente, feedback en alert.

### Mejoras UX detectadas (pendientes por feedback):

- La pantalla debe tener exactamente los mismos estilos y estructura que "Listado de pedidos": layout, paddings, alerts, tabla, etc.
- Falta sección de filtros: agregar búsqueda por cliente y fecha prevista (igual UX y layout que listado).
- El bloque de filtros debe ir siempre arriba, con botón limpiar y lógica reactiva.
- Feedback visual y estructura 1:1 con listado.

---

## Próximas acciones/corrección

- [ ] Refactorizar preparacion-pedidos para usar los mismos estilos/homogeneidad visual.
- [ ] Implementar bloque de filtros (cliente, fecha), copiar/refactorizar del listado, y aplicar a la lista de preparación.
- [ ] Test de UX e integración tras ajuste.
- [ ] Documentar patrón común en systemPatterns.md para futuras pantallas.

---

### Estado general
- Arquitectura sólida, foco en detalle UX y consistencia entre pantallas pedido.
