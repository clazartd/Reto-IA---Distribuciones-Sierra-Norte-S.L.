const PedidosController = require('../src/controllers/pedidos.controller');
const PedidosService = require('../src/services/pedidos.service');

jest.mock('../src/services/pedidos.service');

function getMockRes() {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
}

describe('PedidosController', () => {
  afterEach(() => jest.clearAllMocks());

  describe('getAllPedidos', () => {
    it('devuelve pedidos (200)', async () => {
      PedidosService.getAll.mockResolvedValue([{ id: 1 }]);
      const req = { query: {} };
      const res = getMockRes();
      await PedidosController.getAllPedidos(req, res);
      expect(PedidosService.getAll).toHaveBeenCalledWith({});
      expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
    });

    it('maneja error (500)', async () => {
      PedidosService.getAll.mockRejectedValue('Fallo');
      const req = { query: {} };
      const res = getMockRes();
      await PedidosController.getAllPedidos(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener pedidos' });
    });
  });

  describe('getPedidoById', () => {
    it('devuelve pedido (200)', async () => {
      PedidosService.getById.mockResolvedValue({ id: 2 });
      const req = { params: { id: 2 } };
      const res = getMockRes();
      await PedidosController.getPedidoById(req, res);
      expect(res.json).toHaveBeenCalledWith({ id: 2 });
    });

    it('404 si no existe', async () => {
      PedidosService.getById.mockResolvedValue(undefined);
      const req = { params: { id: 999 } };
      const res = getMockRes();
      await PedidosController.getPedidoById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Pedido no encontrado' });
    });

    it('maneja error 500', async () => {
      PedidosService.getById.mockRejectedValue('err');
      const req = { params: { id: 2 } };
      const res = getMockRes();
      await PedidosController.getPedidoById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener pedido' });
    });
  });

  describe('createPedido', () => {
    it('201 al crear', async () => {
      const data = { numeroPedido: 'A1', clienteId: 1, productos: [] };
      PedidosService.create.mockResolvedValue({ id: 9 });
      const req = { body: data };
      const res = getMockRes();
      await PedidosController.createPedido(req, res);
      expect(PedidosService.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 9 });
    });

    it('400 si falta campo', async () => {
      const req = { body: { productos: [] } };
      const res = getMockRes();
      await PedidosController.createPedido(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Faltan campos obligatorios' });
    });

    it('500 si service falla', async () => {
      PedidosService.create.mockRejectedValue('fallo create');
      const data = { numeroPedido: 'X', clienteId: 2, productos: [] };
      const req = { body: data };
      const res = getMockRes();
      await PedidosController.createPedido(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al crear pedido' });
    });
  });

  describe('updatePedido', () => {
    it('200 cuando actualiza', async () => {
      PedidosService.getById.mockResolvedValue({ id: 1, estado: 'REGISTRADO' });
      PedidosService.update.mockResolvedValue({ id: 1, total: 200 });
      const req = { params: { id: 1 }, body: { total: 200 } };
      const res = getMockRes();
      await PedidosController.updatePedido(req, res);
      expect(res.json).toHaveBeenCalledWith({ id: 1, total: 200 });
    });

    it('404 si no existe', async () => {
      PedidosService.getById.mockResolvedValue(undefined);
      const req = { params: { id: 456 }, body: {} };
      const res = getMockRes();
      await PedidosController.updatePedido(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Pedido no encontrado' });
    });

    it('409 si cancelado', async () => {
      PedidosService.getById.mockResolvedValue({ id: 5, estado: 'cancelado' });
      const req = { params: { id: 5 }, body: {} };
      const res = getMockRes();
      await PedidosController.updatePedido(req, res);
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ error: 'Pedido cancelado, no editable' });
    });

    it('500 si error', async () => {
      PedidosService.getById.mockRejectedValue('err');
      const req = { params: { id: 1 }, body: {} };
      const res = getMockRes();
      await PedidosController.updatePedido(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al actualizar pedido' });
    });
  });

  describe('cancelPedido', () => {
    it('200 al cancelar', async () => {
      PedidosService.cancel.mockResolvedValue({ id: 1, estado: 'CANCELADO' });
      const req = { params: { id: 1 }, body: { motivo: 'error' } };
      const res = getMockRes();
      await PedidosController.cancelPedido(req, res);
      expect(res.json).toHaveBeenCalledWith({ id: 1, estado: 'CANCELADO' });
    });

    it('400 si no hay motivo', async () => {
      const req = { params: { id: 2 }, body: {} };
      const res = getMockRes();
      await PedidosController.cancelPedido(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Falta motivo de cancelación' });
    });

    it('404 si no existe', async () => {
      PedidosService.cancel.mockResolvedValue(undefined);
      const req = { params: { id: 3 }, body: { motivo: 'm' } };
      const res = getMockRes();
      await PedidosController.cancelPedido(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Pedido no encontrado' });
    });

    it('500 si error', async () => {
      PedidosService.cancel.mockRejectedValue('err');
      const req = { params: { id: 1 }, body: { motivo: 'test' } };
      const res = getMockRes();
      await PedidosController.cancelPedido(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al cancelar pedido' });
    });
  });
});
