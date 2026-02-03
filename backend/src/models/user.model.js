const pool = require('../config/db.config');

/**
 * Busca un usuario por username.
 * @param {string} username
 * @returns {Promise<{id: string, username: string, password: string, role: string} | null>}
 */
async function findUserByUsername(username) {
  const query = 'SELECT id, username, password, role FROM usuarios WHERE username = $1 LIMIT 1;';
  const values = [username];
  try {
    const { rows } = await pool.query(query, values);
    if (rows.length > 0) {
      return rows[0];
    }
    return null;
  } catch (error) {
    throw error;
  }
}

/**
 * Crea un usuario nuevo.
 * @param {{id: string, username: string, password: string, role: string}} userData
 * @returns {Promise<{id: string, username: string, role: string}>}
 */
async function createUser({ id, username, password, role }) {
  const query = `
    INSERT INTO usuarios (id, username, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, username, role;
  `;
  const values = [id, username, password, role];
  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  findUserByUsername,
  createUser
};
