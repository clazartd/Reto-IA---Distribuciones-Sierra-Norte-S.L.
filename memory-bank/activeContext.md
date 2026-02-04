# activeContext.md

## Enfoque actual

**Gestión de Productos**
- El modelo Producto está completamente alineado frontend-backend.
- Todos los endpoints CRUD y DTO exponen los campos:  
  - id, nombre, descripcion, unidadMedida, **precioReferencia (number)**, disponible, createdAt
  - **precioReferencia ahora es tipo number (NUMERIC en BD y number/float en backend y frontend)**
- Cambios aplicados:
  - La tabla SQL: campo precio_referencia NUMERIC(10,2)
  - El modelo backend/ProductoModel: precioReferencia es number, con parsing seguro y sanitización de tipo.
  - Controlador y servicios: sólo usan y exponen precioReferencia como number (no string).
  - Script db-init: todos los inserts de ejemplo y migraciones reflejan el campo como número.
- El frontend TypeScript interface coincide campo a campo incluido el tipo fuerte de precioReferencia.

**Actualización de patrones**
- Se mantiene la regla de dominios modulares (routes/controllers/models/services/config) para Product igual al resto del sistema.
- ProductController y ProductModel siguen la convención DTO ↔ BD sin alias ni transformaciones innecesarias en controladores.
- Si hubiera productos legacy aún en la BD como string, el modelo parsea correctamente a number, pero la persistencia ya es tipo NUMERIC.
- Todos los test y componentes frontend esperan y manipulan precioReferencia como number, evitando bugs de conversión en cálculos o inputs.

**Decisiones activas**
- La validación y el DTO son ahora fuente de verdad: cada vez que cambie la interface del frontend, hay que reflejarlo idénticamente en BD y modelo backend.
- Este upgrade sienta la base del patrón para todas las futuras entidades con campos numéricos relevantes.

### Siguientes pasos
- Monitorizar nuevos features o migrations que dependan de precioReferencia, para garantizar que el tipo number/NUMERIC nunca se degrade por migraciones/parches laterales.
