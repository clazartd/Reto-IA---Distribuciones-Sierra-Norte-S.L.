const express = require('express');
const ctrl = require('../controllers/clientes.controller');

const router = express.Router();

// Listar clientes (activos por defecto)
router.get('/', ctrl.listar);

// Obtener cliente por id
router.get('/:id', ctrl.obtener);

// Crear cliente
router.post('/', ctrl.crear);

// Actualizar cliente básico
router.put('/:id', ctrl.actualizar);

// Borrado lógico (desactivar)
router.put('/:id/desactivar', ctrl.desactivar);

module.exports = router;
