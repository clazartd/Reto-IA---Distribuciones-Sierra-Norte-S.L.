const PedidosService = require('../src/services/pedidos.service');
const Pedido = require('../src/models/pedido.model');

jest.mock('../src/models/pedido.model');

describe('PedidosService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('debe retornar pedidos usando el modelo', async () => {
      const fakePedidos = [{ id: 1 }, { id: 2 }];
      Pedido.findAll.mockResolvedValue(fakePedidos);
      const filtro = { estado: 'ENTREGADO' };
      const result = await PedidosService.getAll(filtro);
      expect(Pedido.findAll).toHaveBeenCalledWith(filtro);
      expect(result).toBe(fakePedidos);
    });

    it('propaga error del modelo', async () => {
      Pedido.findAll.mockRejectedValue(new Error('fallo db'));
      await expect(PedidosService.getAll({})).rejects.toThrow('fallo db');
    });
  });

  describe('getById', () => {
    it('debe usar Pedido.findById con id', async () => {
      Pedido.findById.mockResolvedValue({ id: 7 });
      const res = await PedidosService.getById(7);
      expect(Pedido.findById).toHaveBeenCalledWith(7);
      expect(res).toEqual({ id: 7 });
    });
  });

  describe('create', () => {
    it('debe crear pedido', async () => {
      Pedido.create.mockResolvedValue({ id: 42 });
      const data = { clienteId: 1, total: 123 };
      const res = await PedidosService.create(data);
      expect(Pedido.create).toHaveBeenCalledWith(data);
      expect(res).toEqual({ id: 42 });
    });
  });

  describe('update', () => {
    it('debe actualizar pedido', async () => {
      Pedido.update.mockResolvedValue({ id: 9, total: 200 });
      const res = await PedidosService.update(9, { total: 200 });
      expect(Pedido.update).toHaveBeenCalledWith(9, { total: 200 });
      expect(res).toEqual({ id: 9, total: 200 });
    });
  });

  describe('cancel', () => {
    it('debe cancelar pedido', async () => {
      Pedido.cancel.mockResolvedValue({ id: 8, estado: 'CANCELADO' });
      const res = await PedidosService.cancel(8, 'error cliente');
      expect(Pedido.cancel).toHaveBeenCalledWith(8, 'error cliente');
      expect(res).toEqual({ id: 8, estado: 'CANCELADO' });
    });
  });
});
