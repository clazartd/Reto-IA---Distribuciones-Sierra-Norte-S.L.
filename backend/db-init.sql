-- Crea la base de datos si no existe (debes correr esta parte como superusuario o fuera via psql)
-- CREATE DATABASE <nombre_base>;

-- Selecciona la base de datos (solo necesario al ejecutar interactivo)
-- \c <nombre_base>;

-- Crea la tabla 'usuarios' si no existe
CREATE TABLE IF NOT EXISTS usuarios (
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(30) NOT NULL CHECK (role IN ('DIRECCION', 'COMERCIAL', 'ALMACEN', 'REPARTO', 'ADMINISTRACION'))
);
