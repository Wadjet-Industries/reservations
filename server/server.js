require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const pool = require('../database/psqlDatabase.js');
const expressStaticGzip = require("express-static-gzip");

const app = express();
const port = 3002;

app.use(cors());
app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use('/restaurants/:id', express.static('public'));

// app.use(express.static('public'));

app.use('/', expressStaticGzip('public', {
 enableBrotli: true,
 orderPreference: ['br', 'gz']
}));

app.get('/api/restaurants/:id', (req, response) => {
  const params = req.params.id;
  const queryString = 'SELECT * FROM restaurants INNER JOIN reservations ON restaurants.rest_id = reservations.restaurant_foreign_key where reservations.restaurant_foreign_key = $1';
  const values = [params];
  pool.query(queryString, values, (err, res) => {
    if (err) {
      res.send(err);
    } else {
      response.send(res.rows);
    }
  });
});

// Post methods are not ID specific, so don't need to include it
app.post('/api/restaurants', (req, res) => {
  const queryString = 'INSERT INTO restaurants (rest_id, total_capacity, starting_time, ending_time) VALUES($1, $2, $3, $4)';
  const values = [req.body.rest_id, req.body.total_capacity, req.body.starting_time, req.body.ending_time];

  pool.query(queryString, values, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.rows[0]);
    }
  });
});

app.post('/api/reservations', (req, res) => {
  const queryString = 'INSERT INTO reservations (reservation_id, restaurant_foreign_key, reservation_day, reservation_time, number_of_seats_reserved) VALUES($1, $2, $3, $4, $5)';
  const values = [req.body.reservation_id, req.body.restaurant_foreign_key, req.body.reservation_day, req.body.reservation_time, req.body.number_of_seats_reserved];

  pool.query(queryString, values, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.rows);
    }
  });
});

app.put('/api/restaurants/:id', (req, res) => {
  const param = req.params.id;
  const queryString = 'UPDATE restaurants SET total_capacity = $1, starting_time = $2, ending_time = $3 WHERE rest_id = $4';
  const value = [req.body.total_capacity, req.body.starting_time, req.body.ending_time, Number(req.params.id)];


  pool.query(queryString, value, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results.rows);
    }
  });
});

app.delete('/api/restaurant/:id', (req, res) => {
  const param = req.params.id;

  const queryString = 'DELETE FROM restaurants WHERE rest_id = $1';
  const value = [param];

  pool.query(queryString, value, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results.rows);
    }
  });
});

app.listen(port, () => { console.log(`argh matey we be arriving at port ${port}`); });
