# Active Context

## Foco actual

- Transición a desarrollo backend con Express (v5.2.1) + Node.js.
- Documentado health-check `/api/health` como primer endpoint; permite verificar la conectividad backend antes de avanzar a features reales.
- El backend se arranca desde `backend/index.js`; guideline, troubleshooting y comandos en techContext.md.
- El health-check es requisito (must pass) previo a comenzar entidades y features del dominio (pedidos-productos-clientes).

## Próximos pasos

- Implementar inicio de server y endpoint health-check.
- Probar respuesta con curl, Postman o fetch desde frontend.
- Monitorear cualquier error de arranque (dependencias, versión Node, puerto ocupado...).
- Una vez verificado, proceder a scaffolding modular de rutas, controladores y modelos dominio backend.

## Decisiones clave

- Se prioriza fiabilidad del arranque Express y logging de errores como base para despliegues seguros.
