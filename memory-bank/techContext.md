# Tech Context

## Modelos de dominio principales (ver frontend)

[... detalles previos ...]

## Backend: Express + Node.js + PostgreSQL

- Node.js >= 18, Express 5.2.1.
- **Base de datos**: PostgreSQL 17.7-2
- Conexión gestionada desde `backend/src/config/db.config.js` (con pool y variables entorno).
- Estructura modular, ver systemPatterns.md para detalles.
- Comandos para setup:

```bash
cd backend
npm install
# Edita config/db.config.js con host, db, user, password
node src/server.js
```

### Esquema usuario/roles

- Tabla `usuarios`:
  - id: varchar (PK)
  - username: varchar
  - password: varchar (hash o plano según seguridad/prototipo)
  - role: varchar (de lista controlada: DIRECCION, COMERCIAL, ALMACEN, REPARTO, ADMINISTRACION)

### Detalles de conexión/resiliencia

- Usar algún pool para PostgreSQL; las conexiones deben ser recicladas (Pool de pg/promesas).
- Si hay error de conexión, el backend DEBE abortar launch y loggear claramente el error.
- No almacenar contraseñas en logs ni retornarlas jamás al frontend.
- Mapeo de errores y respuesta json uniforme en todo el API.

### Security & env

- Guardar las credenciales en .env o variables de entorno.
- Proteger las rutas para que no sea posible acceso no autenticado a los endpoints de dominio en el futuro.

### Testear login

- Endpoint: POST `/auth/login`
- Body: `{ username: "...", password: "..." }`
- Si OK: retorna `{ user: { id, username, role } }`
- Si falla: `{ user: null, message: "Usuario o contraseña incorrectos" }`

[... notas frontend ...]
