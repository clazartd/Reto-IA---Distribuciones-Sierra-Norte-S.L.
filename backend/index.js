require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRouter = require('./src/routes/auth.routes.js');
const clientesRouter = require('./src/routes/clientes.routes.js');
const productosRouter = require('./src/routes/productos.routes.js');
const app = express();
const PORT = process.env.PORT || 3001;

// CORS para permitir peticiones desde el frontend Angular
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));

app.use(express.json());
app.use('/auth', authRouter);
app.use('/clientes', clientesRouter);
app.use('/productos', productosRouter);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', ts: Date.now() });
});

app.use((err, req, res, next) => {
  console.error('Internal error:', err);
  res.status(500).json({ status: 'error', message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`[BACKEND] API ready on port ${PORT}`);
});
