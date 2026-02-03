# System Patterns

## Dominio y Modelos Compartidos

[...patrones de frontend pedidos...]

## Backend (Express + Node.js, API RESTful, PostgreSQL)

- API en Node.js + Express (v5.2.1)
- Arquitectura estrictamente modular:  
  - `routes/` → definición de endpoints
  - `controllers/` → gestión de request/response
  - `services/` → lógica de negocio
  - `models/` (o `repositories/`) → acceso a la base de datos/postgres
  - `config/` → conexión, pool y parámetros de PostgreSQL
- **NUNCA** lógica en rutas, ni acceso directo a DB fuera de services/models.

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

### Modelo usuario (DB)

Tabla `usuarios` (PostgreSQL):

| id (varchar, PK) | username (varchar) | password (varchar, seguro) | role (varchar, valores válidos) |
|---|---|---|---|
| ... | ... | ... | DIRECCION/COMERCIAL/ALMACEN/REPARTO/ADMINISTRACION |

- Roles estrictamente los definidos en análisis funcional; sin ampliaciones.

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
