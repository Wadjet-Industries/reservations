const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/L1/reservations', (req, res) => {
  const data = database.getListingData('L1');
  console.log(data);
  res.send(200);
})

app.listen(port, () => {console.log(`argh matey we be arriving at port ${port}`)});