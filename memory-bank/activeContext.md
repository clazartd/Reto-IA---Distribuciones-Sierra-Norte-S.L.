# Active Context

## Foco actual

- Comienza implementación backend funcional, primera prioridad: LOGIN de usuarios con arquitectura Express 5 + PostgreSQL.
- Seguir fielmente estructura modular: routes → controllers → services → models → config.
- Toda validación de usuario (login) recae en backend, consultando PostgreSQL (tabla usuarios), incluyendo control de roles.
- La respuesta para login exitoso/fallido es estricta según las specs del análisis funcional.
- El health-check en `/api/health` sigue activo para debugging, pero el flujo de login es el foco absoluto.

## Próximos pasos

- Scaffold estructural de carpetas y archivos backend/src conforme a guidelines.
- Implementar config de db con pooling y variables entorno.
- Proceder: endpoint POST `/auth/login`, testearlo manual/postman.
- Una vez estable, añadir endpoint/flujo de registro de usuarios.

## Decisión clave

- Modularidad estricta y desacoplo: la lógica NUNCA en rutas, ni queries crudas desde controladores.
- Cumplir con el modelo de usuario/roles y formato de respuesta pactado.
