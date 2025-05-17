const { Pool } = require('pg');Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydb',
  password: '11111111', 
  port: 5432,
});

module.exports = pool;