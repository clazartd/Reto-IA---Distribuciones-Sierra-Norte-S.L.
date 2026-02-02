# System Patterns

## Architecture
- Arquitectura modular basada en Angular, separando lógica en componentes reusables y servicios preparados para integración REST futura.
- Separación por funcionalidad: core (servicios, guards, modelos, constantes), features/{feature}, shared/components.
- Estructura de rutas lazy-loaded, cada conjunto funcional con su módulo y routing propio.
- Para autenticación, el feature auth contiene sus páginas y lógica exclusiva; core engloba los servicios y guards transversales.
- **Pantalla de inicio adaptativa**: Dashboard (feature inicio/pages/dashboard/) es el punto de entrada después del login, mostrando contenido y accesos resumidos adaptados estrictamente al rol activo.  
- **Resúmenes e indicadores**: El dashboard incorpora contadores y gráficos user-friendly, usando PedidosService para resumen y SessionService para contexto de sesión y rol.
- **NUEVO:** Todas las pantallas principales deben aprovechar el ancho útil de la pantalla (preferentemente >80% en desktop), evitando layouts estrechos o formato "card" salvo casos muy justificados.

## Key Technical Decisions
- Simplicidad y responsabilidad única: SRP/SOLID en todos los servicios y componentes.
- Componentes presentacionales (“tontos”) para formularios/login/dashboard; lógica en servicios (AuthService, SessionService, PedidosService).
- Tipado estricto y exhaustivo en TypeScript.
- Rutas principales, incluido el módulo de autenticación/inicio, implementadas siempre como lazy-loaded.
- Guards para acceso y control de navegación, colaborando con SessionService.
- Persistencia local de sesión y usuario con sessionStorage/localStorage.
- Todas las llamadas de autenticación/navegación centralizadas en servicios core.
- UI bajo Bootstrap y SCSS/CSS3, modular y escalable.
- Código y comentarios con propósito y puntos críticos claros.

## Design Patterns in Use
- Atomic/Reusable presentational components.
- Smart/dumb separation: dashboard y páginas sólo presentan datos y botones, toda lógica contextual reside en servicios.
- Dashboard pattern: pantalla de inicio adaptativa, con layout y accesos cambiantes según SessionService.
- Guards como patrón protector de todas las rutas feature.
- Estructura jerárquica y modular, preparada para integración o extensión de features/filtros de acceso adicionales.

## Component Relationships
- Jerarquía: App → features/auth (lazy) → LoginComponent (presentational); App → features/inicio (lazy) → DashboardComponent (presentational).
- AuthService <-> SessionService (control de autenticación y sesión); PedidosService sirve KPIs/resúmenes (solo en dashboard).
- Guards colaboran con SessionService y redirigen según estado o rol.
- Communication: exposición de datos, navegación rápida vía botones, nunca menús anidados.

## Critical Implementation Paths
1. Implementación del Dashboard adaptado por rol tras login.
2. Provisión de métricas y estados de pedidos vía PedidosService, sin llamadas innecesarias o repetidas.
3. Navegación clear-to-action: cada rol sólo ve lo relevante y tiene acceso mediante botones directos.

---

> Actualizar ante cualquier modificación en la estructura de inicio/dashboard, layouts o introducción de nuevas rutas/patrones de resumen gráfico y UX.
