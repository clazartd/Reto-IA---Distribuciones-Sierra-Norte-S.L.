const Producto = require('../models/producto.model');

// Obtener todos los productos disponibles
exports.getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Obtener producto por ID
exports.getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto || !producto.disponible) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

// Crear producto
exports.createProducto = async (req, res) => {
  try {
    // Mapeo directo con DTO de frontend
    const data = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      unidadMedida: req.body.unidadMedida,
      precioReferencia: req.body.precioReferencia,
      disponible: typeof req.body.disponible === 'boolean' ? req.body.disponible : true
    };
    if (!data.nombre || !data.unidadMedida) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    const producto = await Producto.create(data);
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

// Actualizar producto
exports.updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    // Extraer sólo campos válidos
    const data = {};
    if (typeof req.body.nombre !== 'undefined') data.nombre = req.body.nombre;
    if (typeof req.body.descripcion !== 'undefined') data.descripcion = req.body.descripcion;
    if (typeof req.body.unidadMedida !== 'undefined') data.unidadMedida = req.body.unidadMedida;
    if (typeof req.body.precioReferencia !== 'undefined') data.precioReferencia = req.body.precioReferencia;
    if (typeof req.body.disponible !== 'undefined') data.disponible = req.body.disponible;

    const updated = await Producto.update(id, data);
    if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

// Eliminar (desactivar) producto (borrado lógico)
exports.deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const desactivado = await Producto.deactivate(id);
    if (!desactivado) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
