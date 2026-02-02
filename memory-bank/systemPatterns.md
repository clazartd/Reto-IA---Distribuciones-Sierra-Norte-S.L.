# System Patterns

## Architecture
- Arquitectura modular basada en Angular, separando lógica en componentes reusables y servicios preparados para integración REST futura.
- Separación por funcionalidad: core (servicios, guards, modelos, constantes), features/{feature}, shared/components.
- Estructura de rutas lazy-loaded, cada conjunto funcional con su módulo y routing propio.
- Para autenticación, el feature auth contiene sus páginas y lógica exclusiva; core engloba los servicios y guards transversales.

## Key Technical Decisions
- Simplicidad y responsabilidad única: SRP/SOLID en todos los servicios y componentes.
- Componentes presentacionales (“tontos”) para formularios/login; lógica exclusiva en servicios (AuthService, SessionService).
- Tipado estricto y exhaustivo en TypeScript.
- Rutas principales, incluido el módulo de autenticación, implementadas siempre como lazy-loaded.
- Guards para proteger acceso desde el inicio (AuthGuard listo aunque no existan más módulos).
- Persistencia local de sesión y usuario con sessionStorage/localStorage (nunca contraseñas).
- Toda interacción de login/logout centralizada en AuthService; SessionService orquesta estado.
- Mensajes de error y feedback usables y claros, sin tecnicismos.
- UI bajo Bootstrap y SCSS/CSS3, modular y fácilmente escalable.
- Código ampliamente comentado, con propósito, uso y puntos críticos claros.

## Design Patterns in Use
- Atomic/Reusable presentational components en shared (por ahora vacío).
- Smart/dumb separation en auth/pages, lógica delegada a servicios core.
- Formularios reactivos para login, validación desacoplada y enfocada en experiencia usuario.
- Guards como patrón de protección de rutas y módulos, redirigiendo al login si no hay sesión.
- Estructura jerárquica y modular lista para integración de más features y protections.

## Component Relationships
- Jerarquía: App → features/auth (lazy) → LoginComponent (presentational).
- AuthService <-> SessionService: el primero gestiona autenticación, el segundo persistencia y estado.
- Guards colaboran con SessionService para proteger rutas y determinar navegación.
- Communication: datos y eventos gestionados siempre vía Input/Output, services y Angular router.

## Critical Implementation Paths
1. Implementar estructura recomendada de carpetas y módulos funcionales.
2. Construcción de LoginComponent con formulario, validación y feedback limpio (Bootstrap/SCSS).
3. AuthService: login/logout/isAuthenticated, simulación si backend no disponible.
4. SessionService: gestión robusta de sesión/usuario rol en localStorage.
5. Modelo UserModel y roles en constantes.
6. AuthGuard: bloquear rutas y redirigir a login; preparado para escalabilidad.
7. Estado y navegación de sesión persistentemente gestionados.
8. Código y comentarios aptos para onboarding/escalado inmediato.

---

> Actualizar ante cualquier introducción de nuevos servicios/navegación protegida, cambios en seguridad o ampliación funcional.
