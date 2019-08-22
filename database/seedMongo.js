/* eslint-disable import/no-extraneous-dependencies */
// Data will assume the restaurant serves sushi omakase
// Open from 5:30pm till 10pm, and can sit a maximum number of 20 people

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/reservations', { useNewUrlParser: true });
const db = mongoose.connection;


const reservationSchema = new mongoose.Schema({
  Time: {
    type: String,
    unique: true
  },
  Reservation: {
    Reserved: Number,
    Open: Number
  }
});

// algorithm to generate data starting from this month and day
const getStartDate = (() => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
})();
