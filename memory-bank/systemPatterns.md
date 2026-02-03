# System Patterns

## Dominio y Modelos Compartidos

[...patrones de frontend pedidos...]

## Backend (Express + Node.js, API RESTful)

- Toda la API funcionará bajo Node.js + Express (v5.2.1).
- El backend se organiza siguiendo estructura modular bajo `backend/` (rutas, controladores, middlewares, etc).
- Primera ruta implementada para health-check: `GET /api/health` (o `/api/ping`) responde status 200/json para probar la conexión desde frontend y detectar fallos operativos básicos.
- Futuras rutas cubrirán CRUD entidades y autenticación/JWT de ser necesario.

### Patrón inicial

```js
// backend/index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', ts: Date.now() });
});

app.listen(PORT, () => {
  console.log('API ready on port', PORT);
});
```

- El health-check (`/api/health`) es fundamental para integración CI/CD y troubleshooting.
- Todo error al levantar el servicio debe mostrarse por consola y responder 500 si hay internal error.

## Consistencia

- El health-check y logging deben estar presentes en todas las ramas, ambientes y despliegues.
- La respuesta JSON debe ser simple y estable para testeo automatizado y por frontend.
