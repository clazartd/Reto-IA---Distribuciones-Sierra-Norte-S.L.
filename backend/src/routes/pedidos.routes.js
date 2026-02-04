const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidos.controller');

// Listado/filtro
router.get('/', pedidosController.getAllPedidos);
// Obtener por ID
router.get('/:id', pedidosController.getPedidoById);
// Crear
router.post('/', pedidosController.createPedido);
// Actualizar
router.put('/:id', pedidosController.updatePedido);
// Cancelar (cambio de estado + motivo)
router.put('/:id/cancelar', pedidosController.cancelPedido);

module.exports = router;
