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

app.get('/api/restaurants/:id' , (req, response) => {
  const params = req.params.id;
  const queryString = 'SELECT * FROM restaurants INNER JOIN reservations ON restaurants.rest_id = reservations.restaurant_foreign_key where reservations.restaurant_foreign_key = $1';
  const values = [params];
  client.query(queryString, values, (err, res) => {
    if (err) {
      res.send(err);
    } else {
      response.send(res.rows);
    }
  })
})

// app.get('/api/reservations/:id', (req, response) => {
//   const param = req.params.id;
//   console.log('hi', param);


// Post methods are not ID specific, so don't need to include it
app.post('/api/restaurants', (req, res) => {
  // console.log(req.body);
  const queryString = 'INSERT INTO restaurants (rest_id, total_capacity, starting_time, ending_time) VALUES($1, $2, $3, $4)'
  const values=[req.body.rest_id, req.body.total_capacity, req.body.starting_time, req.body.ending_time];
  console.log(values);
  client.query(queryString, values, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.rows[0]);
    }
  })
});

app.post('/api/reservations', (req, res) => {
  const queryString = 'INSERT INTO reservations (reservation_id, restaurant_foreign_key, reservation_day, reservation_time, number_of_seats_reserved) VALUES($1, $2, $3, $4, $5)';
  const values=[req.body.reservation_id, req.body.restaurant_foreign_key, req.body.reservation_day, req.body.reservation_time, req.body.number_of_seats_reserved];
  console.log(values);
  client.query(queryString, values, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.rows);
    }
  })
});

app.put('/api/restaurants/:id', (req, res) => {
  const param = req.params.id;
  const queryString = 'UPDATE restaurants SET total_capacity = $1, starting_time = $2, ending_time = $3 WHERE rest_id = $4'
  const value = [req.body.total_capacity, req.body.starting_time, req.body.ending_time, Number(req.params.id)];
  console.log(value);

  client.query(queryString, value, (err, results) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(results.rows);
    }
  })
});

app.delete('/api/restaurant/:id', (req, res) => {
  const param = req.params.id;
  console.log(param);
  const queryString = 'DELETE FROM restaurants WHERE rest_id = $1'
  const value = [param];
  console.log(value);
  client.query(queryString, value, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results.rows);
    }
  })
});

app.listen(port, () => { console.log(`argh matey we be arriving at port ${port}`); });
