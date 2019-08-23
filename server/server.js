const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const database = require('../database/database.js')

app.use(express.static('public'));

app.get('/api/L1/reservations', (req, res) => {
  database.getListingData('L1')
    .then((data) => {
      const dataForListing = data[0].Dates.slice(1);
      res.send(dataForListing);
    })
    .catch((err) => {
      console.log('Error with retriving data for listing', err);
    });
})

app.listen(port, () => {console.log(`argh matey we be arriving at port ${port}`)});