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

### Dashboard & métricas vivas

- Todas las cards de métricas/resumen (dashboard) en frontend deben obtener sus datos de endpoints backend dedicados para métricas (ejemplo: `/api/pedidos/metrics`), nunca usando mocks ni derived state en el frontend.
- El backend debe exponer agregados óptimos: totalPedidos, pendientes, entregados, reparto, cancelados, urgentes, etc., como parte de la respuesta.
- Nunca persistir valores de agregado, siempre calcularlos en query SQL adecuada.
- El frontend debe consumir y refrescar estos valores usando Observables u otro patrón reactivo.

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

### Principio de enums sincronizados

- Todos los enums clave del dominio, por ejemplo Estado, deben ser únicos, definitivos y sincronizados a nivel de string entre backend y frontend.  
- Prohibido usar strings “a mano” o variantes visuales ad-hoc.

## Testing backend

- Todos los módulos críticos (services, controllers, modelos, rutas) deben tener test unitarios.
- Framework recomendado: Jest (alternativamente Mocha + Chai).
- Coloca los tests en una carpeta `backend/tests/` o usa subcarpetas `__tests__` próximas a cada módulo.
- Cobertura mínima: flujos de éxito (“happy path”) + validación de errores, edge y corner cases.
- Testear enrutado principal, servicios (con mocks de DB), modelos de dominio, validación y controladores, asegurando que los errores o validaciones inválidas lanzan el código/objeto esperado.
- Los tests deben poder ejecutarse con `npm test` o comando equivalente en backend.
- Los nuevos cambios críticos en backend deben requerir test antes de pasar a producción.

## Testing frontend

- Todos los módulos críticos (componentes, servicios, guards, pipes, helpers) en Angular deben tener archivo de test unitario asociado: `<nombre>.spec.ts`.
- Framework: Angular TestBed + Jest o Karma.
- Cobertura mínima: renderizado de templates, lógica de componentes, eventos, interacciones usuario, lógica reactiva, respuestas a errores y casos límite.
- Siempre evitar el uso de done(). Los tests deben usar Promises o async/await para indicar la finalización de pruebas asíncronas.
- Tests de servicios: mocks de dependencias y HTTP; tests de guards: validación de flujos permitidos y bloqueados.
- Los tests deben cubrir tanto el “happy path” como los errores y estados reactivos.
- Los tests pueden ejecutarse con `npm test` en directorio frontend.
- Todo PR/merge relevante debe incluir el test asociado.
