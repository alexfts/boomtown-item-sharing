const { Pool } = require('pg');

module.exports = app => {
  const host = app.get('PG_HOST');
  const user = app.get('PG_USER');
  const password = app.get('PG_PASSWORD');
  const database = app.get('PG_DB');
  return new Pool({
    host,
    user,
    password,
    database,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  });
};
