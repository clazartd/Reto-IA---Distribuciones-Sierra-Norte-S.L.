# System Patterns

## Separación estricta de responsabilidades

- **Componentes UI ("tontos")**: muestran la información y sólo emiten eventos de usuario. Ningún componente contiene lógica de negocio relevante (incluso formularios sólo validan restricciones de usuario, nunca reglas funcionales base).
- **Servicios**: toda lógica de negocio reside aquí (reglas de edición, cancelación, seguridad, comunicación REST).
- **Guards y SessionService**: controlan acceso a rutas y visibilidad de UI, nunca manipulan datos directamente.

---

## Control de flujo: ÚNICO uso de bloques `@if` y `@for` (prohibido *ngIf/*for)

- **Regla:** *ngIf y *ngFor están prohibidos en todos los templates. El proyecto utiliza SOLO la sintaxis de bloques de control Angular (`@if (...) {...}` / `@for (...) {...}`) en toda la base de código.
- **Racional:** 
  - Mayor coherencia con la evolución de Angular.
  - Bloques anidados, claros y 100% verificables en linter/onboarding.
  - Facilita migración futura y revisión automática de templates.
- **Impacto:** 
  - Todos los templates legacy deben migrar inmediatamente.
  - Al subir nuevas features, el CI y code review debe rechazar cualquier uso directo de *ngIf o *ngFor.
  - Todo el equipo está alineado con esta convención y existe onboarding/documentación expresa.
  - Uso de bloques preferido incluso para condiciones sencillas o iteraciones triviales.
- **Dónde:** Documentación, code review, onboarding, y ejemplos funcionales actualizados.

---

## Patrón: Formularios editables bajo condición

- **Situación:** Un pedido sólo puede ser editado si su estado actual es “Registrado” y el usuario tiene perfil COMERCIAL.
- **Implementación:**
  - El formulario recibe el pedido y verifica el estado y el rol vía SessionService y modelo.
  - Si no cumple reglas:
    - Todos los campos del formulario quedarán deshabilitados (`[disabled]=...`), incluidos selects, inputs, etc.
    - Un mensaje claro aparece: “Este pedido ya no puede modificarse porque está en proceso”.
    - El botón "Guardar" queda deshabilitado.
- **Dónde:** `editar-pedido.component.{ts,html}`.
- **Ventaja:** El usuario siempre entiende por qué no puede editar, y la UI nunca permite una acción prohibida.

---

## Patrón: Cancelación de pedido irreversible con motivo obligatorio

- **Trigger:** Botón “Cancelar pedido” visible si el pedido no es “Entregado” ni “Cancelado”.
- **Flujo:**
  - Abre modal (`ConfirmModalComponent` o `CancelPedidoModalComponent`) que muestra advertencia y requiere campo “Motivo de cancelación” (input obligatorio).
  - Al confirmar, el servicio `PedidosService.cancelPedido()` recibe el id y motivo, hace PUT `/pedidos/{id}/cancelar` y actualiza el estado a “Cancelado”.
  - El modal previene cierre accidental, y el formulario no permite continuar sin motivo.
  - Feedback inmediato tras confirmar.
- **UX:** Acción evidente, motivo obligatorio, acción irreversible advertida.

---

## Integración con API REST vía servicios

- **PedidosService** es el único responsable de comunicar con API REST real.
- Todos los métodos llaman a endpoints de backend, nunca hay lógica del lado cliente en los componentes.
- Confirmaciones, errores y estados propagados mediante observables o promesas.
- Métodos clave:
  - `updatePedido(id: number, pedido: Pedido): PUT /pedidos/{id}`
  - `cancelPedido(id: number, motivo: string): PUT /pedidos/{id}/cancelar`

---

## Modelo Pedido actualizado

- El modelo Pedido (`pedido.model.ts`) debe poseer:
  - id: number
  - cliente: string
  - productos: Producto[]
  - cantidades: number[]
  - fechaPrevista: string | Date
  - estado: string
  - motivoCancelacion?: string (opcional, sólo en caso de cancelación)
- NO contiene lógica, sólo representación de datos recibidos/enviados por la API.

---

> Mantener y ampliar estos patrones conforme surjan nuevos flujos críticos (edición, aprobaciones, etc.) para alineación permanente del sistema.
