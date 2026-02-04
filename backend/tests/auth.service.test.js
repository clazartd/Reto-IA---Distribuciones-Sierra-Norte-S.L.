const { authenticateUser, createUser } = require('../src/services/auth.service');
const userModel = require('../src/models/user.model');

jest.mock('../src/models/user.model');
jest.mock('uuid', () => ({ v4: () => 'mock-uuid' }));

describe('auth.service', () => {
  afterEach(() => jest.clearAllMocks());

  describe('authenticateUser', () => {
    it('logea usuario con datos correctos', async () => {
      userModel.findUserByUsername.mockResolvedValue({ id: '1', username: 'u', password: 'pass123', role: 'DIRECCION' });
      const result = await authenticateUser('u', 'pass123');
      expect(userModel.findUserByUsername).toHaveBeenCalledWith('u');
      expect(result).toEqual({ id: '1', username: 'u', role: 'DIRECCION' });
    });
    it('devuelve null si usuario no existe', async () => {
      userModel.findUserByUsername.mockResolvedValue(undefined);
      const result = await authenticateUser('no', 'pass');
      expect(result).toBe(null);
    });
    it('devuelve null si contraseña incorrecta', async () => {
      userModel.findUserByUsername.mockResolvedValue({ id: '2', username: 'm', password: 'real', role: 'ALMACEN' });
      const res = await authenticateUser('m', 'xxx');
      expect(res).toBe(null);
    });
  });

  describe('createUser', () => {
    it('crea usuario si todo es válido', async () => {
      userModel.findUserByUsername.mockResolvedValue(undefined);
      userModel.createUser.mockResolvedValue({ id: 'mock-uuid', username: 'juan', password: 'xyz', role: 'COMERCIAL' });
      const result = await createUser({ username: 'juan', password: 'xyz', role: 'COMERCIAL' });
      expect(userModel.findUserByUsername).toHaveBeenCalledWith('juan');
      expect(userModel.createUser).toHaveBeenCalled();
      expect(result).toEqual({ id: 'mock-uuid', username: 'juan', password: 'xyz', role: 'COMERCIAL' });
    });
    it('falla si falta campo', async () => {
      await expect(createUser({ username: '', password: 'a', role: 'DIRECCION' }))
        .rejects.toThrow('Todos los campos (username, password, role) son obligatorios');
      await expect(createUser({ username: 'xx', password: '', role: 'DIRECCION' }))
        .rejects.toThrow('Todos los campos (username, password, role) son obligatorios');
    });
    it('falla si rol inválido', async () => {
      await expect(createUser({ username: 'p', password: 'q', role: 'INVALIDO' }))
        .rejects.toThrow('Rol no válido');
    });
    it('falla si username repetido', async () => {
      userModel.findUserByUsername.mockResolvedValue({ username: 'pepe' });
      await expect(createUser({ username: 'pepe', password: 'p', role: 'REPARTO' }))
        .rejects.toThrow('Ya existe un usuario con ese username');
    });
  });
});
