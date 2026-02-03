const { authenticateUser, createUser } = require('../services/auth.service');

/**
 * Controlador para login de usuario.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 */
async function loginUser(req, res) {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({
      user: null,
      message: 'Debe proporcionar usuario y contraseña'
    });
  }

  try {
    const user = await authenticateUser(username, password);
    if (user) {
      return res.json({ user });
    } else {
      return res.status(401).json({
        user: null,
        message: 'Usuario o contraseña incorrectos'
      });
    }
  } catch (error) {
    console.error('Error en login', error);
    return res.status(500).json({
      user: null,
      message: 'Error interno del sistema'
    });
  }
}

/**
 * Controlador para registro de usuario.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 */
async function registerUser(req, res) {
  const { username, password, role } = req.body || {};
  try {
    const user = await createUser({ username, password, role });
    return res.status(201).json({ user });
  } catch (error) {
    console.error('Error en registro', error);
    return res.status(400).json({
      user: null,
      message: error.message || 'Error al registrar usuario',
    });
  }
}

module.exports = {
  loginUser,
  registerUser,
};
