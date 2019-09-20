const { Client } = require('pg');

const client = new Client({
  user: 'Admin',
  host: 'localhost',
  database: 'reservations_service',
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log('connected to node-gres');
  }
});

module.exports = client;
