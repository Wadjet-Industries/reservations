const pool = require('./postgresConfig.js');

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
