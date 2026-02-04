# System Patterns

## Dominio y Modelos Compartidos

- Todos los enums de referencia (p. ej., Estado en pedidos) están estrictamente normalizados (mayúsculas, sin espacios o acentos, igual en frontend y backend). Cualquier adición/cambio se propaga de forma obligatoria por ambos lados.
- Las relaciones entre entidades (p. ej., Pedido-Cliente) en frontend se resuelven mediante llamada API en paralelo + Map de lookup (id → label), con acceso reactivo en templates (`getClienteNombre`). No depender nunca de copias, datos legacy ni referencias hardcodeadas.
- Los listados siguen un patrón visual y de experiencia unificado: cajas visuales (`box`), tablas responsivas, badges de estado, columnas homogéneas y filtros visuales arriba.
- El dashboard (pantalla inicio) debe consumir SIEMPRE datos vivos desde API. No se permite el uso de valores hardcodeados/estáticos para cards de resumen (ej: total pedidos, pendientes, entregados, urgentes...). Esta lógica es replicable a cualquier vista resumen.
- Toda lógica de métricas backend debe exponer directamente y de forma óptima los aggregados requeridos por dashboards (ej: endpoints tipo `/api/pedidos/metrics`).

## Backend (Express + Node.js, API RESTful, PostgreSQL)

- API en Node.js + Express (v5.2.1)
- Arquitectura estrictamente modular:  
  - `routes/` → definición de endpoints
  - `controllers/` → gestión de request/response
  - `services/` → lógica de negocio
  - `models/` (o `repositories/`) → acceso a la base de datos/postgres
  - `config/` → conexión, pool y parámetros de PostgreSQL
- **NUNCA** lógica en rutas, ni acceso directo a DB fuera de services/models.

### Test y calidad obligatoria

- Todo módulo/función crítica (servicio, controlador, modelo, ruta) debe tener su test unitario asociado.
- Estructura sugerida: `backend/tests/` o `__tests__` junto a cada módulo fuente.
- Framework: Jest (preferido), Mocha+Chai opcional.
- Los tests deben cubrir al menos: casos de éxito (“happy path”), casos de error y de entradas inválidas.
- Usar mocks/dummies para base de datos y dependencias externas donde aplique.
- No debe aceptarse ningún refactor/cambio relevante en backend sin su test correspondiente.
- Ejecutar `npm test` CI antes de merges a producción.
- Establecer cobertura mínima pactada como equipo (>80% negocio deseable).

### Flujo obligatorio: login

- **POST /auth/login**  
- Recibe: `{ username, password }`  
- Comprueba en DB:
  - Que existen ambos campos
  - Busca usuario (tabla `usuarios`)
  - Compara password (simple, bcrypt no especificado)
  - Si OK: devuelve `{ user: { id, username, role } }`
  - Si NO: `{ user: null, message: 'Usuario o contraseña incorrectos' }`
- El service encapsula la lógica, controller sólo orquesta.

### Relaciones y entidades

- Para toda relación N:1 (ej. pedido-cliente), el id va siempre en la entidad detalle (Pedido), nunca duplicar datos.
- Visualización de atributos “lookup” siempre vía API + Map, nunca guardando textos redundantes en la entidad principal.

### Validación (protocolo obligado)

- Ningún password viaja al Frontend ni se expone.
- El backend audita el acceso y responde en menos de 2s (regla de calidad).

### Esqueleto de carpetas

```
backend/src/
├── app.js
├── server.js
│
├── routes/
│   └── auth.routes.js
│
├── controllers/
│   └── auth.controller.js
│
├── services/
│   └── auth.service.js
│
├── models/
│   └── user.model.js
│
├── config/
│   └── db.config.js
```

### Detalles extra

- El health-check sigue activo (`/api/health`) para debugging y CI.
- Toda futura entidad/domino debe seguir este patrón.
- El patrón metricsApi/dashboard será obligatorio también para futuras necesidades administrativas: nunca consumo de mocks en datos de negocio.
