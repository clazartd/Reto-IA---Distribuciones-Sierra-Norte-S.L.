const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');

// Listado de productos
router.get('/', productosController.getAllProductos);
// Obtener producto individual
router.get('/:id', productosController.getProductoById);
// Crear producto
router.post('/', productosController.createProducto);
// Actualizar producto
router.put('/:id', productosController.updateProducto);
// Eliminar producto (borrado lógico)
router.delete('/:id', productosController.deleteProducto);

module.exports = router;
