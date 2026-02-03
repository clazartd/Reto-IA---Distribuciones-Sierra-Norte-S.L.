# Progress

## Cambios recientes

- Finalizado milestone clave: autenticación y registro de usuario real en backend Express + PostgreSQL.
- Completado bootstrap automatizado de estructura bb.dd/tablas vía `db-init.sql`, `init-db.js` y `npm run db:init`.
- `.env` estandariza la configuración y conexión para cualquier entorno.
- Arquitectura modular validada e implementada a profundidad.
- Todos los endpoints de autenticación ya usan API real, ningún dato mockeado en backend.

## Estado actual

- Backend operativo con endpoints de login y registro funcionales y probados, basados únicamente en la tabla usuarios (db real).
- Inicializador de estructura productivo: si existe la base conecta y crea tablas, si no existe muestra instrucciones para crearla.
- Health-check `/api/health` apto para monitoring e integración CI.
- Toda lógica, validación de campos y roles, persistencia y control de errores manufacturada en backend.
- El frontend angular sigue temporalmente usando mocks en sus servicios de usuario/autenticación.

## Siguientes pasos

- Migrar servicios de autenticación y usuario en frontend (`auth.service.ts`, etc.) a consumo directo del backend REST (métodos login, register).
- Remover mocks y datos hardcodeados de usuario/autenticación del frontend; todo irá vía API.
- Validar integración E2E (login, registro, feedback de errores).
- Documentar y actualizar patterns if necessary.

## Decisión clave

- Transición completa a flujo de auth real: ningún cliente local debe depender de mocks o datos fake en producción.
- El desarrollo futuro debe pivotar sobre endpoints backend reales y centralizados.
