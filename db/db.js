const { Pool } = require('pg');

// Configure connection using your environment variables (.env)
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'scholars_run',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'your_password',
});

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database successfully.');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};