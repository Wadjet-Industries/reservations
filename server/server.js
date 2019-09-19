const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const client = require('../database/psqlDatabase.js');

const app = express();
const port = 3002;
const database = require('../database/database.js');

app.use(cors());
app.use(morgan());
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/:id/reservations', express.static('public'));

app.use(express.static('public'));

app.get('/api/reservations/:id', (req, response) => {
  const param = req.params.id;
  // database.getListingData(param)
  //   .then((data) => {
  //     const dataForListing = data[0].Dates.slice();
  //     res.send(dataForListing);
  //   })
  //   .catch((err) => {
  //     console.log('Error with retriving data for listing', err);
  //   });
  const queryString = 'SELECT * FROM restaurants INNER JOIN reservations ON restaurants.rest_id = reservations.restaurant_foreign_key where reservations.restaurant_foreign_key = $1';
  const values = [Number(param)];
  console.log(values, queryString);
  client.query(queryString, values, (err, res) => {
    if (err) {
      console.log('ERROR:', err);
    } else {
      console.log(res.rows[0]);
      response.send(res.rows);
    }
  });
});

// Post methods are not ID specific, so don't need to include it
app.post('/api/reservation', (req, res) => {
  // console.log(req.body);
  // const queryString = 'INSERT'
});

app.put('/api/:id/reservations', (req, res) => {
  const param = req.params.id;
  // Need to change a reservation
});

app.delete('/api/:id/reservation', (req, res) => {
  const param = req.params.id;
});

app.listen(port, () => { console.log(`argh matey we be arriving at port ${port}`); });
