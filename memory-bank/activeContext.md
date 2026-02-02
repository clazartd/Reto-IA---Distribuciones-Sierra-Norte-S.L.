# Active Context

## Current Work Focus
- Modificar el root de la aplicación (`app.ts` y `app.html`) para que las páginas de login e inicio sean accesibles y visibles correctamente, incluyendo la aplicación de estilos.
- Consolidar la integración Angular moderna: componentes standalone (especialmente LoginComponent), rutas funcionales, y protección de acceso.

## Recent Changes
- **LoginComponent** actualizado a standalone, con la importación requerida de módulos Angular dentro del decorador.
- **AuthModule** corregido: importa (no declara/expone) el LoginComponent.
- **Error Angular resuelto**: Eliminado error de "standalone component in NgModule declarations".
- **Limpieza de caché Angular**: Eliminado `.angular/cache` para resolver EPERM/rmdir, pendiente comprobación de arranque del servidor.
- **Estructura base de rutas** creada para login/inicio protegidas.
- Prohibición de uso de `*ngIf` y `*ngFor` en HTML puro; solo se permiten bloques estructurales modernos con `@if` en plantillas Angular.
- Documentación revisada y memoria sincronizada a contexto actual de arquitectura.

## Next Steps
1. [En progreso] Modificar el template raíz `app.html` (y, si necesario, `app.ts`) para visualizar correctamente los componentes de login/inicio según ruta activa, aplicando estilos globales.
2. Comprobar que los estilos generales y de Bootstrap se cargan y aplican en cada vista.
3. Verificar navegación y experiencia de usuario, garantizando visibilidad y acceso entre login e inicio.
4. Validar carga correcta mediante navegador.
5. Documentar cualquier cambio extra en patrones, flujo de navegación, o integración de páginas.

## Active Decisions & Considerations
- Uso estricto de módulos standalone y modularidad feature-based.
- Root orientado a despliegue de rutas principales y visibilidad sencilla de login/inicio.
- Refuerzo en la aplicación de estilos globales y específicos para experiencia consistente.
- Asegurar que toda lógica esté centralizada y UI sea siempre “tonta”.
- Estado de sesión/autenticación manejado vía servicios, con rutas protegidas por guardia.
