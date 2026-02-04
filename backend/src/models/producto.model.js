const db = require('../config/db.config');

/**
 * Modelo Producto alineado con el frontend.
 */
const ProductoModel = {
  /**
   * Devuelve todos los productos activos (por defecto) o todos si se indica.
   * @param {boolean} [incluirInactivos=false]
   * @returns {Promise<Array>}
   */
  async findAll(incluirInactivos = false) {
    let sql = 'SELECT * FROM productos';
    const params = [];
    if (!incluirInactivos) {
      sql += ' WHERE disponible = TRUE';
    }
    sql += ' ORDER BY createdAt DESC';
    const { rows } = await db.query(sql, params);
    return rows;
  },

  /**
   * Devuelve un producto por id o null.
   * @param {string|number} id
   * @returns {Promise<object|null>}
   */
  async findById(id) {
    const { rows } = await db.query('SELECT * FROM productos WHERE id = $1', [id]);
    return rows[0] || null;
  },

  /**
   * Inserta nuevo producto. Devuelve el registro creado.
   * @param {object} data
   * @returns {Promise<object>}
   */
  async create(data) {
    const {
      nombre,
      descripcion,
      unidadMedida,
      precioReferencia,
      disponible = true
    } = data;
    const sql = `
      INSERT INTO productos
      (nombre, descripcion, unidad_medida, precio_referencia, disponible, createdAt)
      VALUES ($1, $2, $3, $4, $5, DEFAULT)
      RETURNING *`;
    const params = [
      nombre,
      descripcion,
      unidadMedida,
      precioReferencia,
      disponible
    ];
    const { rows } = await db.query(sql, params);
    return rows[0];
  },

  /**
   * Actualiza datos del producto.
   * @param {string|number} id
   * @param {object} data
   * @returns {Promise<object|null>}
   */
  async update(id, data) {
    const campos = ['nombre', 'descripcion', 'unidadMedida', 'precioReferencia', 'disponible'];
    const columnas = ['nombre', 'descripcion', 'unidad_medida', 'precio_referencia', 'disponible'];
    const asignaciones = [];
    const params = [];
    let idx = 1;

    for (let i = 0; i < campos.length; i++) {
      const campo = campos[i];
      if (typeof data[campo] !== 'undefined') {
        asignaciones.push(`${columnas[i]} = $${idx}`);
        params.push(data[campo]);
        idx++;
      }
    }
    if (!asignaciones.length) return this.findById(id);

    const sql = `UPDATE productos SET ${asignaciones.join(', ')} WHERE id = $${idx} RETURNING *`;
    params.push(id);
    const { rows } = await db.query(sql, params);
    return rows[0] || null;
  },

  /**
   * Borrado lógico (desactivación por disponible = false)
   * @param {string|number} id
   * @returns {Promise<object|null>}
   */
  async deactivate(id) {
    const sql = 'UPDATE productos SET disponible = FALSE WHERE id = $1 RETURNING *';
    const { rows } = await db.query(sql, [id]);
    return rows[0] || null;
  },
};

module.exports = ProductoModel;
