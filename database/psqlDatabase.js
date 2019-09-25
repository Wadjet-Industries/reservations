const pool = new Pool({
  user: '',
  password: ''
  host: '18.220.172.62',
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
