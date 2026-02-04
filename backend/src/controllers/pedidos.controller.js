const PedidosService = require('../services/pedidos.service');

// Listado/filtro de pedidos
exports.getAllPedidos = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.estado) filtro.estado = req.query.estado;
    if (req.query.clienteId) filtro.clienteId = req.query.clienteId;
    const pedidos = await PedidosService.getAll(filtro);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
};

// Obtener pedido por ID
exports.getPedidoById = async (req, res) => {
  try {
    const pedido = await PedidosService.getById(req.params.id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedido' });
  }
};

// Crear pedido
exports.createPedido = async (req, res) => {
  try {
    const data = req.body;
    if (!data.numeroPedido || !data.clienteId || !Array.isArray(data.productos)) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    // TODO: añadir validación avanzada (productos[], total, fechas)
    const pedido = await PedidosService.create(data);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear pedido' });
  }
};

// Actualizar pedido
exports.updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    // No permitir editar id, numeroPedido ni estado cancelado
    const pedido = await PedidosService.getById(id);
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
    if (pedido.estado === 'cancelado') return res.status(409).json({ error: 'Pedido cancelado, no editable' });
    const updated = await PedidosService.update(id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar pedido' });
  }
};

// Cancelar pedido (estado + motivo)
exports.cancelPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { motivo } = req.body;
    if (!motivo) return res.status(400).json({ error: 'Falta motivo de cancelación' });
    const pedido = await PedidosService.cancel(id, motivo);
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al cancelar pedido' });
  }
};
