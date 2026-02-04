const clientesController = require('../src/controllers/clientes.controller');
const clientesService = require('../src/services/clientes.service');

jest.mock('../src/services/clientes.service');

function getMockRes() {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
}

describe('clientes.controller', () => {
  afterEach(() => jest.clearAllMocks());

  describe('listar', () => {
    it('devuelve array clientes (200)', async () => {
      clientesService.listar.mockResolvedValue([{ id: 'c1' }]);
      const req = { query: {} };
      const res = getMockRes();
      await clientesController.listar(req, res);
      expect(clientesService.listar).toHaveBeenCalledWith({ incluirInactivos: false });
      expect(res.json).toHaveBeenCalledWith([{ id: 'c1' }]);
    });
    it('propaga error', async () => {
      const res = getMockRes();
      clientesService.listar.mockRejectedValue(new Error('no existe'));
      await clientesController.listar({ query: {} }, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'no existe' });
    });
  });

  describe('obtener', () => {
    it('devuelve cliente (200)', async () => {
      clientesService.obtenerPorId.mockResolvedValue({ id: 9 });
      const req = { params: { id: 9 } };
      const res = getMockRes();
      await clientesController.obtener(req, res);
      expect(clientesService.obtenerPorId).toHaveBeenCalledWith(9);
      expect(res.json).toHaveBeenCalledWith({ id: 9 });
    });
    it('handle error 404', async () => {
      clientesService.obtenerPorId.mockRejectedValue(new Error('El cliente no existe'));
      const res = getMockRes();
      await clientesController.obtener({ params: { id: 99 } }, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'El cliente no existe' });
    });
  });

  describe('crear', () => {
    it('201 al crear', async () => {
      clientesService.crear.mockResolvedValue({ id: 'nvo' });
      const req = { body: { nombre: 'Raúl' } };
      const res = getMockRes();
      await clientesController.crear(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 'nvo' });
    });
    it('error validación', async () => {
      clientesService.crear.mockRejectedValue(new Error('El nombre es obligatorio'));
      const req = { body: { nombre: '  ' } };
      const res = getMockRes();
      await clientesController.crear(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'El nombre es obligatorio' });
    });
  });

  describe('actualizar', () => {
    it('200 al actualizar', async () => {
      clientesService.actualizar.mockResolvedValue({ id: 4, nombre: 'Maria' });
      const req = { params: { id: 4 }, body: { nombre: 'Maria' } };
      const res = getMockRes();
      await clientesController.actualizar(req, res);
      expect(res.json).toHaveBeenCalledWith({ id: 4, nombre: 'Maria' });
    });
    it('error validación 400', async () => {
      clientesService.actualizar.mockRejectedValue(new Error('El nombre es obligatorio'));
      const res = getMockRes();
      await clientesController.actualizar({ params: { id: 4 }, body: { nombre: '' } }, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'El nombre es obligatorio' });
    });
    it('error 404 si no existe', async () => {
      clientesService.actualizar.mockRejectedValue(new Error('El cliente no existe'));
      const res = getMockRes();
      await clientesController.actualizar({ params: { id: 5 }, body: {} }, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'El cliente no existe' });
    });
  });

  describe('desactivar', () => {
    it('200 al desactivar', async () => {
      clientesService.desactivar.mockResolvedValue({ id: 5, activo: false });
      const req = { params: { id: 5 } };
      const res = getMockRes();
      await clientesController.desactivar(req, res);
      expect(res.json).toHaveBeenCalledWith({ id: 5, activo: false });
    });
    it('409 si ya desactivado', async () => {
      clientesService.desactivar.mockRejectedValue(new Error('ya está desactivado'));
      const req = { params: { id: 7 } };
      const res = getMockRes();
      await clientesController.desactivar(req, res);
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ error: 'ya está desactivado' });
    });
    it('404 si no existe', async () => {
      clientesService.desactivar.mockRejectedValue(new Error('no existe'));
      const req = { params: { id: 99 } };
      const res = getMockRes();
      await clientesController.desactivar(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'no existe' });
    });
  });
});
