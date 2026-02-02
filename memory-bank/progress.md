# Progress

## Qué funciona

- El menú superior es claro y sin dropdown confuso: "Pedidos" es sólo un link directo.
- Listado de pedidos tiene botón "+ Agregar nuevo pedido" visible sólo para rol COMERCIAL.
- SessionService y guards controlan visibilidad/seguridad.
- Rutas `/pedidos` redirecciona correctamente a `/pedidos/listado`.
- Todos los accesos y botones respetan roles y experiencia esperada.
- **Edición controlada de pedidos (en progreso):**
  - Únicamente usuarios COMERCIAL pueden editar, validado por SessionService.
  - El formulario de edición permite guardar cambios sólo si el pedido está en estado "Registrado".
  - Si el estado es diferente, el formulario deshabilita todos los campos y muestra un mensaje claro: “Este pedido ya no puede modificarse porque está en proceso”.
  - Patrón de disable/enable controlado por el estado del pedido.
  - Botón "Guardar" sólo habilitado si la edición es válida.
- **Cancelación de pedidos (en progreso):**
  - Botón "Cancelar pedido" solo aparece cuando el pedido NO está entregado ni cancelado.
  - Al pulsar, se muestra modal con campo obligatorio "Motivo de cancelación".
  - La acción es irreversible, el mensaje lo advierte claramente.
- **NUEVO:** Migración total a bloques de control Angular efectuada. 
  - Todos los *ngIf y *ngFor han sido eliminados de los templates.
  - Se exige uso de `@if` y `@for` como convención de proyecto/equipo.
  - Code review y CI rechazará code legacy. 
  - Documentación y onboarding de equipo ajustados a esta nueva regla.

## Qué falta por construir / próximo objetivo

### Edición y Cancelación de pedidos: checklist

- [x] Editar pedido solo si estado === 'Registrado', para rol COMERCIAL.
- [x] Deshabilitar campos y mostrar mensaje si el estado es distinto.
- [x] Mensaje “Este pedido ya no puede modificarse porque está en proceso” en modo no editable.
- [x] Botón "Guardar" solo habilitado cuando edición es válida y posible.
- [x] Mensaje claro de éxito tras guardar.
- [x] Cancelar pedido antes de "Entregado" únicamente.
- [x] Motivo de cancelación obligatorio.
- [x] Estado cambia aut. a "Cancelado" tras acción de cancelación.
- [x] Acción irreversible y advertida en UI.
- [x] Feedback inmediato tras cancelar.
- [x] Model Pedido incluye ahora campo opcional motivoCancelacion.
- [x] Lógica de edición y cancelación reside en PedidosService, no componente.
- [x] Métodos ampliados en PedidosService:
   - updatePedido(id: number, pedido: Pedido): PUT /pedidos/{id}
   - cancelPedido(id: number, motivo: string): PUT /pedidos/{id}/cancelar
- [x] Migración e imposición del uso exclusivo de bloques de control Angular (`@if`, `@for`)

### Tests & Validaciones

- [ ] Validación exhaustiva de UI/UX para el flujo completo de edición/cancelación.
- [ ] Pruebas de integración con REST (mock y real backend cuando esté disponible).
- [ ] Revisión contra requisitos Memory Bank (alineación patrón de formularios "editables sólo bajo condición").
- [ ] Feedback de usuario tras iteración y entrega.

### Estado general
- Arquitectura robusta y alineada a patrones Memory Bank.
- Control de roles, feedback visual y separación lógica estricta listos.
- Migración a bloques de control Angular completada y supervisada via CI/code review.
