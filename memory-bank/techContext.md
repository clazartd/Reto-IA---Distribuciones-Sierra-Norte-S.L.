# Tech Context

## Modelos de dominio principales (ver frontend)

[... detalles previos ...]

## Backend: Express + Node.js

- Node.js >= 18 recomendado (por soporte LTS y features modernos).
- Framework: **Express** v5.2.1.
- Entry-point principal: `backend/index.js` (convención).
- Dependencias gestionadas vía `backend/package.json`; instalar con `npm install` en la carpeta correspondiente.

### Setup y comando de arranque

```bash
cd backend
npm install
node index.js
```
- El servidor quedará escuchando en el puerto 3001 (o establecer PORT env variable).

### Prueba inicial

- Probar GET [http://localhost:3001/api/health](http://localhost:3001/api/health)
- Respuesta esperada (200 OK):

  ```json
  {
    "status": "ok",
    "ts": 1706971112067
  }
  ```

### Notas técnicas

- La primera release solo expone el health-check.
- Si el puerto está ocupado, cambiar el valor o liberar el puerto.
- Ante cualquier error de boot, revisar: dependencias, versiones, variables entorno, logs de consola.
- El health-check es el 'ping' de desarrollo y debe pasar antes de arrancar features reales.

[... detalles adicionales de frontend ...]
