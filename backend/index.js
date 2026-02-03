// Backend Express API v5.2.1 - Health Check básico

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

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
