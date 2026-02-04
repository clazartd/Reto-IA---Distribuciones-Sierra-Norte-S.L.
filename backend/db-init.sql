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

-- Crea la tabla 'clientes' si no existe
CREATE TABLE IF NOT EXISTS clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(120) NOT NULL,
  email VARCHAR(120),
  telefono VARCHAR(30),
  direccion VARCHAR(200),
  provincia VARCHAR(120),
  codigo_postal VARCHAR(20),
  contacto VARCHAR(120),
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- Tabla productos alineada con frontend
DROP TABLE IF EXISTS productos;
CREATE TABLE IF NOT EXISTS productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  unidad_medida VARCHAR(32) NOT NULL,
  precio_referencia NUMERIC(10,2),
  disponible BOOLEAN NOT NULL DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT NOW()
);

-- 15 productos de alimentación alineados a frontend
INSERT INTO productos (nombre, descripcion, unidad_medida, precio_referencia, disponible, createdAt) VALUES
  ('Aceite de oliva virgen extra', 'Botella 1L calidad extra', 'L', 7.99, TRUE, CURRENT_TIMESTAMP),
  ('Arroz redondo', 'Paquete de 1kg, ideal para paellas', 'kg', 1.19, TRUE, CURRENT_TIMESTAMP),
  ('Leche entera', 'Pack 6 bricks de 1L de leche fresca', 'L', 4.29, TRUE, CURRENT_TIMESTAMP),
  ('Huevos camperos', 'Docena de huevos de gallinas camperas', 'docena', 2.89, TRUE, CURRENT_TIMESTAMP),
  ('Pan integral', 'Barra de pan 100% integral, 400gr', 'ud', 1.10, TRUE, CURRENT_TIMESTAMP),
  ('Filetes de pechuga de pollo', 'Bandeja 500g pollo fresco', 'kg', 11.50, TRUE, CURRENT_TIMESTAMP),
  ('Manzanas fuji', 'Malla de 1kg de manzanas variedad fuji', 'kg', 2.25, TRUE, CURRENT_TIMESTAMP),
  ('Yogur natural', 'Pack de 8 unidades, sin azúcares añadidos', 'ud', 2.49, TRUE, CURRENT_TIMESTAMP),
  ('Pasta macarrón', 'Macarrones 500gr de trigo duro', 'kg', 1.98, TRUE, CURRENT_TIMESTAMP),
  ('Tomate triturado', 'Bote de cristal 400gr tomate natural', 'ud', 1.50, TRUE, CURRENT_TIMESTAMP),
  ('Salmón ahumado', 'Lonchas 200gr extra calidad', 'kg', 34.75, TRUE, CURRENT_TIMESTAMP),
  ('Café molido', 'Paquete de 250gr, tueste natural', 'kg', 11.16, TRUE, CURRENT_TIMESTAMP),
  ('Queso curado de oveja', 'Cuña 300gr producción local', 'kg', 17.33, TRUE, CURRENT_TIMESTAMP),
  ('Mermelada de fresa', 'Tarro 350gr, 50% fruta', 'ud', 1.65, TRUE, CURRENT_TIMESTAMP),
  ('Cereal desayuno avena', 'Caja 500gr copos de avena integral', 'kg', 4.30, TRUE, CURRENT_TIMESTAMP)
;
