const ClientesService = require('../src/services/clientes.service');
const Cliente = require('../src/models/cliente.model');

jest.mock('../src/models/cliente.model');

describe('ClientesService', () => {
  afterEach(() => jest.clearAllMocks());

  describe('listar', () => {
    it('listado por defecto solo activos', async () => {
      Cliente.findAll.mockResolvedValue([{ id: 'c1' }]);
      const res = await ClientesService.listar();
      expect(Cliente.findAll).toHaveBeenCalledWith(false);
      expect(res).toEqual([{ id: 'c1' }]);
    });
    it('listado incluyendo inactivos', async () => {
      Cliente.findAll.mockResolvedValue([{ id: 'c2', activo: false }]);
      const res = await ClientesService.listar({ incluirInactivos: true });
      expect(Cliente.findAll).toHaveBeenCalledWith(true);
      expect(res).toEqual([{ id: 'c2', activo: false }]);
    });
  });

  describe('obtenerPorId', () => {
    it('devuelve cliente si existe', async () => {
      Cliente.findById.mockResolvedValue({ id: 1 });
      const res = await ClientesService.obtenerPorId(1);
      expect(Cliente.findById).toHaveBeenCalledWith(1);
      expect(res).toEqual({ id: 1 });
    });
    it('lanza error si no existe', async () => {
      Cliente.findById.mockResolvedValue(undefined);
      await expect(ClientesService.obtenerPorId('X')).rejects.toThrow('El cliente no existe');
    });
  });

  describe('crear', () => {
    it('crea cliente si nombre válido', async () => {
      Cliente.create.mockResolvedValue({ id: 'abc' });
      const data = { nombre: 'Juan' };
      const res = await ClientesService.crear(data);
      expect(Cliente.create).toHaveBeenCalledWith(data);
      expect(res).toEqual({ id: 'abc' });
    });
    it('lanza error si nombre vacío', async () => {
      await expect(ClientesService.crear({ nombre: '  ' })).rejects.toThrow('El nombre es obligatorio');
    });
    it('lanza error si nombre inexistente', async () => {
      await expect(ClientesService.crear({})).rejects.toThrow('El nombre es obligatorio');
    });
  });

  describe('actualizar', () => {
    it('actualiza si existe y nombre válido', async () => {
      Cliente.findById.mockResolvedValue({ id: 1, nombre: 'Ana' });
      Cliente.update.mockResolvedValue({ id: 1, nombre: 'Luis' });
      const res = await ClientesService.actualizar(1, { nombre: 'Luis' });
      expect(Cliente.update).toHaveBeenCalledWith(1, { nombre: 'Luis' });
      expect(res).toEqual({ id: 1, nombre: 'Luis' });
    });
    it('lanza error si no existe', async () => {
      Cliente.findById.mockResolvedValue(undefined);
      await expect(ClientesService.actualizar(7, { nombre: 'Pep' })).rejects.toThrow('El cliente no existe');
    });
    it('lanza error si nombre vacío', async () => {
      Cliente.findById.mockResolvedValue({ id: 1 });
      await expect(ClientesService.actualizar(1, { nombre: ' ' })).rejects.toThrow('El nombre es obligatorio');
    });
    it('elimina createdAt y activo del update', async () => {
      Cliente.findById.mockResolvedValue({ id: 10, nombre: 'Clara', activo: true });
      Cliente.update.mockResolvedValue({ id: 10 });
      await ClientesService.actualizar(10, { nombre: 'Clara', createdAt: 'x', activo: false });
      expect(Cliente.update).toHaveBeenCalledWith(10, { nombre: 'Clara' });
    });
  });

  describe('desactivar', () => {
    it('desactiva cliente si activo', async () => {
      Cliente.findById.mockResolvedValue({ id: 2, activo: true });
      Cliente.deactivate.mockResolvedValue({ id: 2, activo: false });
      const res = await ClientesService.desactivar(2);
      expect(Cliente.deactivate).toHaveBeenCalledWith(2);
      expect(res).toEqual({ id: 2, activo: false });
    });
    it('lanza error si no existe', async () => {
      Cliente.findById.mockResolvedValue(null);
      await expect(ClientesService.desactivar(9)).rejects.toThrow('El cliente no existe');
    });
    it('lanza error si ya estaba desactivado', async () => {
      Cliente.findById.mockResolvedValue({ id: 5, activo: false });
      await expect(ClientesService.desactivar(5)).rejects.toThrow('El cliente ya está desactivado');
    });
  });
});
