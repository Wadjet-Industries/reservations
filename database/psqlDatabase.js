const { Client } = require('pg');

const client = new Client({
  user: 'Admin',
  host: 'localhost',
  database: 'reservations_service',
  port: 5432,
  password: '',
});

client.connect((err) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log('connected to node-gres');
  }
});

exports.module = client;

