const db = require('../config/db.config');

/**
 * Modelo Cliente - solo acceso a datos PostgreSQL, sin lógica de negocio.
 */
const ClienteModel = {
  /**
   * Devuelve todos los clientes activos (por defecto) o todos si se indica.
   * @param {boolean} [incluirInactivos=false]
   * @returns {Promise<Array>}
   */
  async findAll(incluirInactivos = false) {
    let sql = 'SELECT * FROM clientes';
    const params = [];
    if (!incluirInactivos) {
      sql += ' WHERE activo = TRUE';
    }
    sql += ' ORDER BY created_at DESC';
    const { rows } = await db.query(sql, params);
    return rows;
  },

  /**
   * Devuelve un cliente por id o null.
   * @param {string} id
   * @returns {Promise<object|null>}
   */
  async findById(id) {
    const { rows } = await db.query('SELECT * FROM clientes WHERE id = $1', [id]);
    return rows[0] || null;
  },

  /**
   * Inserta nuevo cliente. Devuelve el registro creado.
   * @param {object} data
   * @returns {Promise<object>}
   */
  async create(data) {
    const { nombre, email, telefono, direccion, provincia, codigoPostal, contacto } = data;
    const sql = `
      INSERT INTO clientes
      (nombre, email, telefono, direccion, provincia, codigo_postal, contacto, activo, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE, DEFAULT)
      RETURNING *`;
    const params = [
      nombre, email, telefono, direccion, provincia, codigoPostal, contacto,
    ];
    const { rows } = await db.query(sql, params);
    return rows[0];
  },

  /**
   * Actualiza datos (no toca created_at ni activo).
   * @param {string} id
   * @param {object} data
   * @returns {Promise<object|null>}
   */
  async update(id, data) {
    // Solo actualizamos los campos editables
    const campos = ['nombre', 'email', 'telefono', 'direccion', 'provincia', 'codigoPostal', 'contacto'];
    const asignaciones = [];
    const params = [];
    let idx = 1;

    for (const campo of campos) {
      if (typeof data[campo] !== 'undefined') {
        // Mapear field frontend a columna SQL si es necesario
        const columna = campo === 'codigoPostal' ? 'codigo_postal' : campo;
        asignaciones.push(`${columna} = $${idx}`);
        params.push(data[campo]);
        idx++;
      }
    }
    if (!asignaciones.length) return this.findById(id); // Nada que actualizar

    const sql = `UPDATE clientes SET ${asignaciones.join(', ')} WHERE id = $${idx} RETURNING *`;
    params.push(id);
    const { rows } = await db.query(sql, params);
    return rows[0] || null;
  },

  /**
   * Borrado lógico (desactivación)
   * @param {string} id
   * @returns {Promise<object|null>}
   */
  async deactivate(id) {
    const sql = 'UPDATE clientes SET activo = FALSE WHERE id = $1 RETURNING *';
    const { rows } = await db.query(sql, [id]);
    return rows[0] || null;
  },
};

module.exports = ClienteModel;
