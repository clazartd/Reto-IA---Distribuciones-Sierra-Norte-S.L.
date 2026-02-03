# Active Context

## Foco actual

- Backend funcional terminado: login y registro de usuarios implementados usando Express 5 + PostgreSQL real.
- Arquitectura modular completa (routes, controllers, services, models, config), desacoplada y validada.
- Autenticación y registro sólo a través de API REST, completamente des-mockeada.
- Inicialización de estructura vía scripts automatizados: `.env` centraliza conexión, `npm run db:init` crea tablas esenciales (usuarios), manual creación de BD si no existe.
- Toda la lógica de autenticación/roles y persistencia se valida en la capa backend/servicios, no en mock/local ni controladores.
- El health-check sigue activo en `/api/health` para debugging.

## Próximos pasos

- Migrar el frontend para eliminar datos/usuarios mockeados en servicios.
- Conectar servicios Angular (`auth.service.ts`, etc.) a API backend REST real (`/auth/login`, `/auth/register`).
- Validar login, registro y protección de rutas contra API productiva, asegurando feedback claro y seguro.
- Asegurar migración suave: default a API, fallback opcional (en dev) si backend está caído.
- Dejar toda la autenticación y permisos centralizada sólo en backend.

## Decisión clave

- El frontend debe depender 100% del backend para autenticación/usuarios (sin datos harcodeados ni mocks).
- La robustez modular y la validación centralizada sientan base para seguridad y mantenibilidad extendida.
