const controller = require('../src/controllers/productos.controller');
const Producto = require('../src/models/producto.model');

jest.mock('../src/models/producto.model');

function getMockRes() {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
}

describe('productos.controller', () => {
  afterEach(() => jest.clearAllMocks());

  describe('getAllProductos', () => {
    it('devuelve productos (200)', async () => {
      Producto.findAll.mockResolvedValue([{ id: 1 }]);
      const req = {};
      const res = getMockRes();
      await controller.getAllProductos(req, res);
      expect(Producto.findAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
    });
    it('500 si modelo falla', async () => {
      Producto.findAll.mockRejectedValue(new Error('db err'));
      const req = {};
      const res = getMockRes();
      await controller.getAllProductos(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener productos' });
    });
  });

  describe('getProductoById', () => {
    it('devuelve producto si existe y disponible', async () => {
      Producto.findById.mockResolvedValue({ id: 3, disponible: true });
      const req = { params: { id: 3 } };
      const res = getMockRes();
      await controller.getProductoById(req, res);
      expect(res.json).toHaveBeenCalledWith({ id: 3, disponible: true });
    });
    it('404 si no existe', async () => {
      Producto.findById.mockResolvedValue(null);
      const req = { params: { id: 99 } };
      const res = getMockRes();
      await controller.getProductoById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Producto no encontrado' });
    });
    it('404 si no disponible', async () => {
      Producto.findById.mockResolvedValue({ id: 10, disponible: false });
      const req = { params: { id: 10 } };
      const res = getMockRes();
      await controller.getProductoById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Producto no encontrado' });
    });
    it('500 si error', async () => {
      Producto.findById.mockRejectedValue('x');
      const req = { params: { id: 7 } };
      const res = getMockRes();
      await controller.getProductoById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener producto' });
    });
  });

  describe('createProducto', () => {
    it('201 al crear producto con nombre y unidadMedida', async () => {
      Producto.create.mockResolvedValue({ id: '101' });
      const req = { body: { nombre: 'taza', unidadMedida: 'ud', precioReferencia: 2, descripcion: '', disponible: false } };
      const res = getMockRes();
      await controller.createProducto(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: '101' });
    });
    it('400 si falta nombre', async () => {
      const req = { body: { unidadMedida: 'kg', precioReferencia: 1 } };
      const res = getMockRes();
      await controller.createProducto(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Faltan campos obligatorios' });
    });
    it('400 si falta unidadMedida', async () => {
      const req = { body: { nombre: 'pan', precioReferencia: 0.7 } };
      const res = getMockRes();
      await controller.createProducto(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Faltan campos obligatorios' });
    });
    it('500 si error', async () => {
      Producto.create.mockRejectedValue('fail');
      const req = { body: { nombre: 'taza', unidadMedida: 'ud' } };
      const res = getMockRes();
      await controller.createProducto(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al crear producto' });
    });
  });

  describe('updateProducto', () => {
    it('200 si actualiza', async () => {
      Producto.update.mockResolvedValue({ id: 6 });
      const req = { params: { id: 6 }, body: { nombre: 'plato', precioReferencia: 2 } };
      const res = getMockRes();
      await controller.updateProducto(req, res);
      expect(Producto.update).toHaveBeenCalledWith(6, { nombre: 'plato', precioReferencia: 2 });
      expect(res.json).toHaveBeenCalledWith({ id: 6 });
    });
    it('404 si producto no existe', async () => {
      Producto.update.mockResolvedValue(null);
      const req = { params: { id: 112 }, body: {} };
      const res = getMockRes();
      await controller.updateProducto(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Producto no encontrado' });
    });
    it('500 si error', async () => {
      Producto.update.mockRejectedValue('err');
      const req = { params: { id: 113 }, body: {} };
      const res = getMockRes();
      await controller.updateProducto(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al actualizar producto' });
    });
  });

  describe('deleteProducto', () => {
    it('200 al eliminar', async () => {
      Producto.deactivate.mockResolvedValue(true);
      const req = { params: { id: 44 } };
      const res = getMockRes();
      await controller.deleteProducto(req, res);
      expect(res.json).toHaveBeenCalledWith({ message: 'Producto eliminado correctamente' });
    });
    it('404 si no existe', async () => {
      Producto.deactivate.mockResolvedValue(null);
      const req = { params: { id: 99 } };
      const res = getMockRes();
      await controller.deleteProducto(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Producto no encontrado' });
    });
    it('500 si error', async () => {
      Producto.deactivate.mockRejectedValue('err');
      const req = { params: { id: 88 } };
      const res = getMockRes();
      await controller.deleteProducto(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al eliminar producto' });
    });
  });
});
