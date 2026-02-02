# Active Context

## Últimos cambios implementados

- Refactorizado el modal de cancelación de pedido a un componente reutilizable y desacoplado (`CancelPedidoModalComponent`) presente en `shared/components`. Ahora todo el flujo de cancelación centraliza lógica, validación de motivo y UI accesible, disparando eventos al padre.
- Eliminadas absolutamente todas las directivas legacy `*ngIf=` de todos los templates. El proyecto emplea única y exclusivamente la sintaxis de bloques de control Angular (`@if (...) { ... }`), alineando las vistas a los nuevos patrones recomendados del framework. Esta convención (prohibido *ngIf y *for) pasa a ser estándar de equipo/proyecto.
- Todos los modals gestionan entrada y eventos mediante inputs/outputs, evitando acoplamiento de lógica.
- Standalone Components: todos los componentes reutilizables y pantallas Angular se declaran con `standalone: true` y configuran sus imports explícitamente.
- Lógica de negocio solo en PedidosService (update/cancelación).
- Otros patrones: revisión en systemPatterns.md.

---

## Próximo objetivo: Validar flujo funcional completo (edición, cancelación) y documentar aprendizaje de la migración a bloques de control en los tests y el onboarding técnico.

---

> Mantener el contexto y reforzar en el onboarding de nuevos miembros la convención: JAMÁS usar *ngIf ni *for, siempre bloques.
