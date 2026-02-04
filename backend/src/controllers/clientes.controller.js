const clientesService = require('../services/clientes.service');

/**
 * Convierte y standardiza errores del servicio.
 */
function handleError(res, error) {
  let code = 400;
  let msg = error.message || 'Error inesperado';

  if (/no existe/i.test(msg)) code = 404;
  if (/ya está desactivado/i.test(msg)) code = 409;

  return res.status(code).json({ error: msg });
}

module.exports = {
  // GET /clientes
  async listar(req, res) {
    try {
      const incluirInactivos = req.query.inactivos === 'true';
      const clientes = await clientesService.listar({ incluirInactivos });
      res.json(clientes);
    } catch (e) {
      handleError(res, e);
    }
  },

  // GET /clientes/:id
  async obtener(req, res) {
    try {
      const cliente = await clientesService.obtenerPorId(req.params.id);
      res.json(cliente);
    } catch (e) {
      handleError(res, e);
    }
  },

  // POST /clientes
  async crear(req, res) {
    try {
      const cliente = await clientesService.crear(req.body);
      res.status(201).json(cliente);
    } catch (e) {
      handleError(res, e);
    }
  },

  // PUT /clientes/:id
  async actualizar(req, res) {
    try {
      const cliente = await clientesService.actualizar(req.params.id, req.body);
      res.json(cliente);
    } catch (e) {
      handleError(res, e);
    }
  },

  // PUT /clientes/:id/desactivar (borrado lógico)
  async desactivar(req, res) {
    try {
      const cliente = await clientesService.desactivar(req.params.id);
      res.json(cliente);
    } catch (e) {
      handleError(res, e);
    }
  },
};
