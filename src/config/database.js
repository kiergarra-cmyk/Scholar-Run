// Database settings for BOTH the running API and sequelize-cli.
// Values come from .env - nothing secret is written in this file.
const env = require('./env');

const settings = {
  username: 'postgres',
  password: 'postgres',
  database: 'scholar_run',
  host: '127.0.0.1',
  port: '5432',
  dialect: 'postgres',
  logging: false,
  // Track seeders in a table, the same way migrations are tracked,
  // so running "db:seed:all" twice does not insert the data twice.
  seederStorage: 'sequelize',
  pool: { max: 10, min: 0, idle: 10000 },
};

module.exports = {
  development: settings,
  test: settings,
  production: settings,
};
