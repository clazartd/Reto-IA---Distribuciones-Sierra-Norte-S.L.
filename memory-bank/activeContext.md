# Active Context

## Últimos cambios implementados

- El menú superior ("navbar") ya no muestra "Pedidos" como dropdown, sino como enlace normal. Todos los cambios de visibilidad y acceso por rol se hacen en el componente de listado.
- En la pantalla de listado de pedidos, se añadió el botón "+ Agregar nuevo pedido", sólo visible para usuarios con el rol COMERCIAL.
- El sistema de rutas de pedidos redirecciona automáticamente `/pedidos` a `/pedidos/listado`.
- La gestión de sesión, guards y visibilidad del menú respetan los patrones definidos en el Memory Bank y están alineadas a los requisitos de experiencia claros y directos.
- **NUEVO:** Las pantallas principales (dashboard, listado, etc) deben ocupar la mayor parte del ancho útil de la pantalla, no sólo 1/3 ni cajas estrechas. La experiencia debe ser cómoda y visualmente rica en desktop.

---

## Próximo objetivo: Pantalla de Inicio adaptativa (Dashboard)

**Objetivos principales:**
- Centralizar la información y accesos tras el login.
- El contenido y accesos siempre dependen del rol autenticado.
- Reducir la navegación confusa o superflua.
- Mostrar indicadores visuales simples del estado de los pedidos (`Registrados`, `Preparados`, `En reparto`, `Entregados`, `Cancelados`).

**Pautas clave para la implementación:**
- Lenguaje claro, sin tecnicismos.
- Acciones directas con botones, no menús anidados ni configuraciones ocultas.
- Indicadores y gráficos user-friendly para visión global según rol.
- **Visibilidad y contenido estrictamente adaptados al perfil**:
  - **COMERCIAL**: resumen global, acceso directo a nuevo pedido y alerta por pedidos pendientes de preparación.
  - **ALMACÉN**: foco en pendientes de preparar con botón destacado.
  - **REPARTO**: solo entregas en reparto y confirmar entregas.
  - **ADMINISTRACIÓN**: sólo consulta/histórico/soporte.
  - **DIRECCIÓN**: visión global y acceso histórico.
- Sin edición directa desde la pantalla de inicio.

**Componente Angular sugerido:**  
src/app/features/inicio/pages/dashboard/dashboard.component.{ts,html,scss}  
Responsabilidad: resumen gráfico + accesos según rol (usa SessionService y PedidosService).

---

> Mantener este contexto actualizado mientras se diseñe y ejecute el Dashboard para garantizar alineación continua con requisitos y arquitectura del proyecto.
