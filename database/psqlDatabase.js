const { Pool } = require('pg');

const pool = new Pool({
  user: 'Admin',
  host: 'localhost',
  database: 'reservations_service',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error(err);
  process.exit(-1);
})

pool.connect((err) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log('connected to node-gres');
  }
});

module.exports = pool;
