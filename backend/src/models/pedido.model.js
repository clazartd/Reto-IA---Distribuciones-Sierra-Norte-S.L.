const db = require('../config/db.config');

// Valores válidos para estado
const ESTADOS_VALIDOS = ['REGISTRADO', 'PREPARACION', 'REPARTO', 'ENTREGADO', 'CANCELADO'];

/**
 * Modelo Pedido - acceso a datos PostgreSQL, estado en mayúsculas normalizado
 */
const PedidoModel = {
  async findAll(filtro = {}) {
    let sql = 'SELECT * FROM pedidos';
    const params = [];
    let n = 1;

    if (filtro.estado || filtro.clienteId) {
      sql += ' WHERE ';
      const partes = [];
      if (filtro.estado) {
        partes.push(`estado = $${n++}`);
        params.push(filtro.estado);
      }
      if (filtro.clienteId) {
        partes.push(`cliente_id = $${n++}`);
        params.push(filtro.clienteId);
      }
      sql += partes.join(' AND ');
    }
    sql += ' ORDER BY fecha_solicitud DESC';
    const { rows } = await db.query(sql, params);
    return rows.map(PedidoModel.parseRow);
  },

  async findById(id) {
    const { rows } = await db.query('SELECT * FROM pedidos WHERE id = $1', [id]);
    return rows[0] ? PedidoModel.parseRow(rows[0]) : null;
  },

  async create(data) {
    const { numeroPedido, clienteId, productos, fechaSolicitud, fechaPrevistaEntrega, estado, urgente, motivoCancelacion, total } = data;
    // Validación de estado
    if (!ESTADOS_VALIDOS.includes(estado)) {
      throw new Error('Estado de pedido no válido');
    }
    const sql = `
      INSERT INTO pedidos
      (numero_pedido, cliente_id, productos, fecha_solicitud, fecha_prevista_entrega, estado, urgente, motivo_cancelacion, total, createdAt)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
      RETURNING *`;
    const params = [
      numeroPedido,
      clienteId,
      JSON.stringify(productos),
      fechaSolicitud,
      fechaPrevistaEntrega,
      estado,
      urgente || false,
      motivoCancelacion || null,
      total
    ];
    const { rows } = await db.query(sql, params);
    return PedidoModel.parseRow(rows[0]);
  },

  async update(id, data) {
    const campos = ['clienteId', 'productos', 'fechaSolicitud', 'fechaPrevistaEntrega', 'estado', 'urgente', 'motivoCancelacion', 'total'];
    const columnas = ['cliente_id', 'productos', 'fecha_solicitud', 'fecha_prevista_entrega', 'estado', 'urgente', 'motivo_cancelacion', 'total'];
    const asignaciones = [];
    const params = [];
    let idx = 1;

    for (let i = 0; i < campos.length; i++) {
      const campo = campos[i];
      if (typeof data[campo] !== 'undefined') {
        if (campo === 'productos') {
          asignaciones.push(`${columnas[i]} = $${idx}`);
          params.push(JSON.stringify(data[campo]));
        } else if (campo === 'estado') {
          // Validación estado
          if (!ESTADOS_VALIDOS.includes(data[campo])) {
            throw new Error('Estado de pedido no válido');
          }
          asignaciones.push(`${columnas[i]} = $${idx}`);
          params.push(data[campo]);
        } else {
          asignaciones.push(`${columnas[i]} = $${idx}`);
          params.push(data[campo]);
        }
        idx++;
      }
    }
    if (!asignaciones.length) return this.findById(id);

    const sql = `UPDATE pedidos SET ${asignaciones.join(', ')} WHERE id = $${idx} RETURNING *`;
    params.push(id);
    const { rows } = await db.query(sql, params);
    return rows[0] ? PedidoModel.parseRow(rows[0]) : null;
  },

  async cancel(id, motivo) {
    const sql = 'UPDATE pedidos SET estado = $1, motivo_cancelacion = $2 WHERE id = $3 RETURNING *';
    const { rows } = await db.query(sql, ['CANCELADO', motivo, id]);
    return rows[0] ? PedidoModel.parseRow(rows[0]) : null;
  },

  /**
   * Convierte row SQL a DTO Pedido con productos
   */
  parseRow(row) {
    return {
      id: row.id,
      numeroPedido: row.numero_pedido,
      clienteId: row.cliente_id,
      productos: Array.isArray(row.productos) ? row.productos : JSON.parse(row.productos),
      fechaSolicitud: row.fecha_solicitud,
      fechaPrevistaEntrega: row.fecha_prevista_entrega,
      estado: row.estado,
      urgente: row.urgente,
      motivoCancelacion: row.motivo_cancelacion,
      total: parseFloat(row.total)
    }
  }
};

module.exports = PedidoModel;
