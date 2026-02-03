require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function initDb() {
  const sqlPath = path.join(__dirname, 'db-init.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432
  });

  try {
    await client.connect();
  } catch (err) {
    console.error("No se pudo conectar a la base de datos.");
    console.error("- ¿Existe la base de datos '" + process.env.PGDATABASE + "'?");
    console.error("- Si no, créala manualmente con: createdb " + process.env.PGDATABASE);
    process.exit(1);
  }

  try {
    await client.query(sql);
    console.log("Estructura de tablas creada/actualizada correctamente.");
  } catch (err) {
    console.error("Error al crear tablas:", err.message);
    process.exit(2);
  } finally {
    await client.end();
  }
}

initDb();
