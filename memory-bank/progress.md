# progress.md

## Estado actual

- CRUD de producto activo y alineado en toda la plataforma.
- El campo precioReferencia está tipado en todas partes como number (NUMERIC en SQL/Postgres, number en modelos JS/backend y interface TS/frontend).
- Se eliminaron todos los mocks del frontend, los datos provienen 100% del backend.
- Se garantiza interoperabilidad DTO ↔ BD ↔ servicios sin conversiones de tipo ni bugs en el stack.
- El script db-init ya inicializa productos con precioReferencia como número (sin comillas).
- Todos los controladores y modelos de producto sólo exponen, almacenan y manipulan precioReferencia como número; si se recibe string se parsea pero no se persiste así.
- La memoria bancaria (Memory Bank) documenta exhaustivamente el upgrade y el patrón a seguir para modelos futuros.

## Pendiente
- Si se encuentran asignaciones o inputs de precioReferencia como string en componentes de frontend, refactor directo del tipado (por ahora no se detectan).
- Mantener test y revisión constante de los endpoints cuando se migren datos legacy o se hagan integraciones externas.
