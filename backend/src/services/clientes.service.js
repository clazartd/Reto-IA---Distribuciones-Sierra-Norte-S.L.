const Cliente = require('../models/cliente.model');

class ClientesService {
  /**
   * Listar clientes, activos por defecto.
   */
  async listar({ incluirInactivos = false } = {}) {
    return Cliente.findAll(incluirInactivos);
  }

  /**
   * Obtener un cliente por ID.
   */
  async obtenerPorId(id) {
    const cliente = await Cliente.findById(id);
    if (!cliente) throw new Error('El cliente no existe');
    return cliente;
  }

  /**
   * Crear un nuevo cliente. Valida reglas de negocio.
   */
  async crear(data) {
    if (!data.nombre || !data.nombre.trim()) {
      throw new Error('El nombre es obligatorio');
    }
    // Resto de campos opcionales pueden ser null
    return Cliente.create(data);
  }

  /**
   * Actualiza datos básicos. No permite modificar createdAt ni activo.
   */
  async actualizar(id, data) {
    const cliente = await Cliente.findById(id);
    if (!cliente) throw new Error('El cliente no existe');
    if (typeof data.nombre !== 'undefined' && !data.nombre.trim()) {
      throw new Error('El nombre es obligatorio');
    }
    // Evitar cambio de createdAt y activo desde aquí
    delete data.createdAt;
    delete data.activo;
    return Cliente.update(id, data);
  }

  /**
   * Borrado lógico: desactivar.
   */
  async desactivar(id) {
    const cliente = await Cliente.findById(id);
    if (!cliente) throw new Error('El cliente no existe');
    if (!cliente.activo) throw new Error('El cliente ya está desactivado');
    return Cliente.deactivate(id);
  }
}

module.exports = new ClientesService();
