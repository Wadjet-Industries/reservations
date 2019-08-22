/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

// Data will assume the restaurant serves sushi omakase
// Open from 5:30pm till 10pm, and can sit a maximum number of 20 people
const Promise = require('bluebird');
const mongoose = require('mongoose');

const dropCurrentDatabase = mongoose.connection.dropDatabase()
  .then(() => { console.log('database dropped'); })
  .catch((err) => { console.log('could not drop database', err); });

const currentConnection = mongoose.connect('mongodb://localhost/reservations', { useNewUrlParser: true }).then(() => { console.log('Mango connected'); }).catch((error) => { console.log('Error with Mango Reconnect', error); });

mongoose.connect('mongodb://localhost/reservations', { useNewUrlParser: true })
  .then(() => { console.log('Mango connected'); })
  .then(() => (dropCurrentDatabase))
  .then(() => (currentConnection))
  .catch((error) => { console.log('Error with Mango Connect', error); });

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
let startDay;
let startYear;
let startMonth;

const getStartDate = (() => {
  const date = new Date();
  startDay = date.getDate();
  startYear = date.getFullYear();
  startMonth = date.getMonth() + 1;
  return `${startYear}-${startMonth}-${startDay}`;
})();

const daysInMonth = (month, year) => (
  new Date(year, month, 0).getDate()
);

let count = 0;

// {Time: ‘5:00’, Reservations: {reserved: 5, open: 15}}

const generateDocumentPerTime = (date) => {
  const DateCollection = mongoose.model(`${date}`, reservationSchema);
  const all = [];
  for (let i = 4; i <= 9.5; i += 0.5) {
    let time;
    if (i % 1 !== 0) {
      time = `${(i - 0.5)}:00`;
    } else {
      time = `${i}:00`;
    }
    const reserved = (Math.random() * 21);
    const instance = new DateCollection({
      Time: time,
      Reservation: {
        Reserved: reserved,
        Open: (20 - reserved)
      }
    });
    all.push(instance.save((err) => {
      if (err) {
        console.log(`error with saving data for ${date} ${time}`);
      }
    }));
  }
  Promise.all(all)
};

//given the month i can generate days
//given a date I can generate times and push them

const generateDocumentsPerDay = (month, day, year) => {

};
