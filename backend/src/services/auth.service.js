const { findUserByUsername, createUser: createUserModel } = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');

const VALID_ROLES = [
  'DIRECCION',
  'COMERCIAL',
  'ALMACEN',
  'REPARTO',
  'ADMINISTRACION'
];

/**
 * Autentica un usuario por username y password.
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<{id: string, username: string, role: string} | null>}
 */
async function authenticateUser(username, password) {
  const user = await findUserByUsername(username);
  if (user && user.password === password) {
    // Nunca retornar la contraseña
    const { id, username: uname, role } = user;
    return { id, username: uname, role };
  }
  // Usuario no encontrado o contraseña incorrecta
  return null;
}

/**
 * Crea un nuevo usuario, validando los campos requeridos y unicidad del username.
 * @param {{username: string, password: string, role: string}} data 
 * @returns {Promise<{id: string, username: string, role: string}>}
 */
async function createUser({ username, password, role }) {
  if (!username || !password || !role) {
    throw new Error('Todos los campos (username, password, role) son obligatorios');
  }
  if (!VALID_ROLES.includes(role)) {
    throw new Error('Rol no válido');
  }
  const existing = await findUserByUsername(username);
  if (existing) {
    throw new Error('Ya existe un usuario con ese username');
  }
  // Crear el usuario
  const id = uuidv4();
  const user = await createUserModel({ id, username, password, role });
  return user;
}

module.exports = {
  authenticateUser,
  createUser
};
