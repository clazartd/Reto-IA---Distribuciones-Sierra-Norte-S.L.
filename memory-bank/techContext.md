# Tech Context

## Technologies Used
- Angular como framework principal para el frontend.
- TypeScript para desarrollo seguro, estrictamente tipado (sin any).
- Angular Router para routing, todos los módulos funcionales lazy-loaded.
- Bootstrap para la UI de formularios y layouts, junto a SCSS/CSS3.
- HTML5 para markup semántico y accesible.
- (Opcional) Angular Material en futuro para consistencia y UX moderna.

## Development Setup
- Estructura modular separada por funcionalidad:
  - core/ (servicios, guards, modelos, constantes)
  - features/auth/pages (pantalla/login)
  - shared/components (reusables para escalado futuro)
- Autoformato y linting vía editorconfig y reglas del proyecto.
- Uso estándar de Angular CLI para scaffolding, testing y dependencias.

## Technical Constraints
- Control de sesión y acceso solo a nivel frontend (sin acceso a BD ni lógica sensible).
- AuthService gestiona login/logout (mock, sin backend real por ahora).
- SessionService persiste usuario y rol con sessionStorage/localStorage (nunca contraseñas).
- Modelo UserModel solo con id, username, role.
- Roles declarados como constantes en core.
- Formularios reactivos con validación resistente y mensajes claros, sin tecnicismos.
- Únicamente componentes "tontos" para UI, toda lógica en servicios.
- Rutas protegidas con AuthGuard desde el principio.
- Mensajería y errores listos para localización y claridad máxima.

## Dependencies & Tooling
- npm como gestor de paquetes.
- Angular CLI, Bootstrap, SCSS.
- Herramientas de linting/formateo integradas (.editorconfig).

## Tool Usage Patterns
- Uso de formularios reactivos siempre.
- Todos los servicios (auth, session) strictly typed y cubiertos por tests en su momento.
- Guards coordinados con servicios de sesión.
- Components presentan datos, nunca manipulan sesión ni lógica directa.
- sessionStorage/localStorage solo para persistencia mínima necesaria.
- Routing estructurado por módulos funcionales, siempre lazy-loaded.

---

> Actualizar ante la introducción de nuevas dependencias, cambios de stack o ampliaciones técnicas.
