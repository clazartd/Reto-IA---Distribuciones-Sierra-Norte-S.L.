# Progress

## What Works
- Arquitectura de autenticación y gestión de sesión definida y alineada con buenas prácticas aXet.
- Estructura de carpetas y módulos diseñada según separación funcional (core/features/shared).
- Plan detallado para AuthService, SessionService, modelo UserModel y roles.
- Definido el flujo esperado de sesión (login, persistencia, guard, logout).
- Fix implementado: LoginComponent ahora es standalone y se importa en AuthModule como indica Angular 16+, eliminando error de declaración.

## What's Left to Build
- [ ] Crear la estructura de carpetas y archivos obligatoria en src/app/.
- [ ] Implementar LoginComponent y el formulario reactivo con validación.
- [ ] Desarrollar AuthService (login/logout/isAuthenticated) y simular endpoint backend.
- [ ] Programar SessionService para gestionar usuario y rol de forma persistente.
- [ ] Definir y exportar modelo UserModel y roles constantes.
- [ ] Implementar AuthGuard y proteger/validar rutas.
- [ ] Formular mensajes claros y usabilidad elevada en la pantalla de login.
- [ ] Validar lazy-loading en el módulo de autenticación y protección para rutas futuras.
- [ ] Documentar flujo, patrón y uso de cada componente y servicio.

## Current Status
Fase de diseño y planificación completa para la funcionalidad de autenticación y control de sesión a nivel frontend. La app está lista para comenzar la implementación en Angular, siguiendo la estructura modular y alineada con las prácticas y constraints documentadas.

## Known Issues
- No existen impedimentos técnicos, a la espera de implementación.
- Riesgo principal: asegurar persistencia y control de sesión robustos solo en frontend.

## Project Decisions Evolution
- Refuerzo de separación por funcionalidad como núcleo de arquitectura.
- Experiencia y mensajes dirigidos a usuarios sin conocimientos técnicos.
- Preparación de guards y control de permisos desde la primer release del login.
- Estructura y código preparados para escalado y cobertura de nuevos módulos.
- Adoptada norma UI: está prohibido usar *ngIf y *ngFor en archivos .html (Angular); obligatorio usar @if y estructuras modernas para control de renderizado y listas.
- Corrección adoptada: LoginComponent standalone debe ser importado, no declarado, en los NgModules.

---

> Actualizar tras cada avance clave en la implementación de la funcionalidad de autenticación, aparecimiento de issues o validación de nuevos flujos.
