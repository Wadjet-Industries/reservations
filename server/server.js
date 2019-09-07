const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');


const app = express();
const port = 3002;
const database = require('../database/database.js');

app.use(cors());
app.use(morgan());
app.use(compression());
app.use('/:id/reservations', express.static('public'));

app.use(express.static('public'));

app.get('/api/:id/reservations', (req, res) => {
  const param = req.params.id;
  database.getListingData(param)
    .then((data) => {
      const dataForListing = data[0].Dates.slice();
      res.send(dataForListing);
    })
    .catch((err) => {
      console.log('Error with retriving data for listing', err);
    });
});

app.listen(port, () => { console.log(`argh matey we be arriving at port ${port}`); });
