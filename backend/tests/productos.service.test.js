const ProductosService = require('../src/services/productos.service');
const Producto = require('../src/models/producto.model');

jest.mock('../src/models/producto.model');

describe('ProductosService', () => {
  afterEach(() => jest.clearAllMocks());

  describe('getAll', () => {
    it('devuelve productos', async () => {
      const fake = [{ id: 1 }];
      Producto.findAll.mockResolvedValue(fake);
      const res = await ProductosService.getAll();
      expect(Producto.findAll).toHaveBeenCalled();
      expect(res).toEqual(fake);
    });
    it('propaga error de modelo', async () => {
      Producto.findAll.mockRejectedValue(new Error('Falló BD'));
      await expect(ProductosService.getAll()).rejects.toThrow('Falló BD');
    });
  });

  describe('getById', () => {
    it('devuelve producto por id', async () => {
      Producto.findById.mockResolvedValue({ id: 7 });
      const res = await ProductosService.getById(7);
      expect(Producto.findById).toHaveBeenCalledWith(7);
      expect(res).toEqual({ id: 7 });
    });
  });

  describe('create', () => {
    it('crea producto', async () => {
      Producto.create.mockResolvedValue({ id: 8 });
      const data = { nombre: 'Bolígrafo' };
      const res = await ProductosService.create(data);
      expect(Producto.create).toHaveBeenCalledWith(data);
      expect(res).toEqual({ id: 8 });
    });
  });

  describe('update', () => {
    it('actualiza producto', async () => {
      Producto.update.mockResolvedValue({ id: 11 });
      const res = await ProductosService.update(11, { nombre: 'Regla' });
      expect(Producto.update).toHaveBeenCalledWith(11, { nombre: 'Regla' });
      expect(res).toEqual({ id: 11 });
    });
  });

  describe('deactivate', () => {
    it('desactiva producto', async () => {
      Producto.deactivate.mockResolvedValue({ id: 5, activo: false });
      const res = await ProductosService.deactivate(5);
      expect(Producto.deactivate).toHaveBeenCalledWith(5);
      expect(res).toEqual({ id: 5, activo: false });
    });
  });
});
