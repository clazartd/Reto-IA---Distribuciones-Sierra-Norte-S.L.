CREATE TABLE IF NOT EXISTS usuarios (
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(30) NOT NULL CHECK (role IN ('DIRECCION', 'COMERCIAL', 'ALMACEN', 'REPARTO', 'ADMINISTRACION'))
);

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

CREATE TABLE IF NOT EXISTS productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  unidad_medida VARCHAR(32) NOT NULL,
  precio_referencia NUMERIC(10,2),
  disponible BOOLEAN NOT NULL DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pedidos (
  id SERIAL PRIMARY KEY,
  numero_pedido VARCHAR(32) NOT NULL,
  cliente_id UUID NOT NULL REFERENCES clientes(id),
  productos JSONB NOT NULL, -- array de ProductoBasico
  fecha_solicitud DATE NOT NULL,
  fecha_prevista_entrega DATE NOT NULL,
  estado VARCHAR(20) NOT NULL CHECK (estado IN ('REGISTRADO','PREPARACION','REPARTO','ENTREGADO','CANCELADO')),
  urgente BOOLEAN NOT NULL DEFAULT FALSE,
  motivo_cancelacion TEXT,
  total NUMERIC(12,2) NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW()
);