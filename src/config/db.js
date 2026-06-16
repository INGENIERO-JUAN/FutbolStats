const { Pool } = require('pg');
require('dotenv').config();

// ✅ CORRECCIÓN ERROR 1: Se eliminó el hardcode de 'localhost'.
// En producción/Docker se usa DATABASE_URL (inyectada por docker-compose o Render).
// En tests locales también se inyecta DATABASE_URL apuntando al servicio de postgres.
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  // En producción (Render) se requiere SSL; en local/test no.
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.on('connect', () => {
  console.log('⚡ Conexión exitosa a la base de datos PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Error inesperado en el pool de Postgres', err);
});

module.exports = pool;
