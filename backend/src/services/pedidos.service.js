const Pedido = require('../models/pedido.model');

const PedidosService = {
  async getAll(filtro) {
    return Pedido.findAll(filtro);
  },
  async getById(id) {
    return Pedido.findById(id);
  },
  async create(data) {
    return Pedido.create(data);
  },
  async update(id, data) {
    return Pedido.update(id, data);
  },
  async cancel(id, motivo) {
    return Pedido.cancel(id, motivo);
  },
};

module.exports = PedidosService;
