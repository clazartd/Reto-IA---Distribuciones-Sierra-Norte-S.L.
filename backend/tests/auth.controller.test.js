const { loginUser, registerUser } = require('../src/controllers/auth.controller');
const authService = require('../src/services/auth.service');

jest.mock('../src/services/auth.service');

function getMockRes() {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
}

describe('auth.controller', () => {
  afterEach(() => jest.clearAllMocks());

  describe('loginUser', () => {
    it('400 si faltan campos', async () => {
      const req = { body: { username: '', password: '' } };
      const res = getMockRes();
      await loginUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        user: null,
        message: 'Debe proporcionar usuario y contraseña'
      });
    });
    it('login devuelve user (200)', async () => {
      authService.authenticateUser.mockResolvedValue({ id: '1', username: 'u', role: 'ADMINISTRACION' });
      const req = { body: { username: 'u', password: 'pw' } };
      const res = getMockRes();
      await loginUser(req, res);
      expect(authService.authenticateUser).toHaveBeenCalledWith('u', 'pw');
      expect(res.json).toHaveBeenCalledWith({ user: { id: '1', username: 'u', role: 'ADMINISTRACION' } });
    });
    it('401 si credenciales mal', async () => {
      authService.authenticateUser.mockResolvedValue(null);
      const req = { body: { username: 'fail', password: 'pw' } };
      const res = getMockRes();
      await loginUser(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        user: null,
        message: 'Usuario o contraseña incorrectos'
      });
    });
    it('500 si error interno', async () => {
      authService.authenticateUser.mockRejectedValue(new Error('db fail'));
      const req = { body: { username: 'sys', password: 'err' } };
      const res = getMockRes();
      await loginUser(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        user: null,
        message: 'Error interno del sistema'
      });
    });
  });

  describe('registerUser', () => {
    it('201 al crear', async () => {
      authService.createUser.mockResolvedValue({ id: 'u', username: 'pepe', role: 'COMERCIAL' });
      const req = { body: { username: 'pepe', password: 'xxx', role: 'COMERCIAL' } };
      const res = getMockRes();
      await registerUser(req, res);
      expect(authService.createUser).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ user: { id: 'u', username: 'pepe', role: 'COMERCIAL' } });
    });
    it('400 si error de validación', async () => {
      authService.createUser.mockRejectedValue(new Error('Ya existe un usuario con ese username'));
      const req = { body: { username: 'xx', password: 'p', role: 'DIRECCION' } };
      const res = getMockRes();
      await registerUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        user: null,
        message: 'Ya existe un usuario con ese username'
      });
    });
  });
});
