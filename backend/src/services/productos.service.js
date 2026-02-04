const Producto = require('../models/producto.model');

const ProductosService = {
  async getAll() {
    return Producto.findAll();
  },
  async getById(id) {
    return Producto.findById(id);
  },
  async create(data) {
    return Producto.create(data);
  },
  async update(id, data) {
    return Producto.update(id, data);
  },
  async deactivate(id) {
    return Producto.deactivate(id);
  },
};

module.exports = ProductosService;
