/* eslint-disable no-plusplus */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

// Data will assume the restaurant serves sushi omakase
// Open from 5:30pm till 10pm, and can sit a maximum number of 20 people
const Promise = require('bluebird');
const mongoose = require('mongoose');

const generateListing = (listing, numberOfSeats, openHour, closeHour) => {
  const dropCurrentDatabase = mongoose.connection.dropDatabase();

  const listingURL = `mongodb://localhost/${listing}`;

  const currentConnection = mongoose.connect(listingURL, { useNewUrlParser: true });

  // change promise handling of thens to flow better

  mongoose.connect(listingURL, { useNewUrlParser: true })
    .then(() => { console.log('Mango intial connected'); })
    .catch((error) => { console.log('Error with Mango Connect', error); return error; })
    .then(() => (dropCurrentDatabase))
    .then(() => { console.log('database dropped'); })
    .catch((err) => { console.log('could not drop database', err); return err; })
    .then(() => (currentConnection))
    .then(() => { console.log('Mango final connected'); })
    .catch((error) => { console.log('Error with Mango Reconnect', error); });

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

  (() => {
    const date = new Date();
    startDay = date.getDate();
    startYear = date.getFullYear();
    startMonth = date.getMonth() + 1;
    // return `${startYear}-${startMonth}-${startDay}`;
  })();

  const daysInMonth = (month, year) => (
    new Date(year, month, 0).getDate()
  );

  let count = 0;

  //fix my document generation function

  const generateDocumentPerTime = (date) => {
    const DateCollection = mongoose.models(date) || mongoose.model(`${date}`, reservationSchema);

    const all = [];
    for (let i = openHour; i <= closeHour; i += 0.5) {
      let time;
      if (i % 1 !== 0) {
        time = `${(i - 0.5)}:30`;
      } else {
        time = `${i}:00`;
      }
      const reserved = Math.floor((Math.random() * 21));
      const instance = new DateCollection({
        Time: time,
        Reservation: {
          Reserved: reserved,
          Open: (numberOfSeats - reserved)
        }
      });
      all.push(instance.save((err) => {
        if (err) {
          console.log(`error with saving data for ${date} ${time}`);
        }
      }));
    }
    Promise.all(all);
  };

  //given the month i can generate days
  //given a date I can generate times and push them

  const generateDocumentsPerDay = (month, day, year) => {
    const numbDays = daysInMonth(month, year);
    if (count === 100) {
      // eslint-disable-next-line no-useless-return
      return;
    }
    if (day <= numbDays) {
      const collectionDate = `M${month}-D${day}-Y${year}`;
      generateDocumentPerTime(collectionDate);
      count++;
      generateDocumentsPerDay(month, day + 1, year);
    }
    if (numbDays < day) {
      if (month === 12) {
        generateDocumentsPerDay(1, 1, year + 1);
      } else {
        generateDocumentsPerDay(month + 1, 1, year);
      }
    }
  };

  generateDocumentsPerDay(startMonth, startDay, startYear);
};

(() => {
  for (let i = 1; i <= 100; i++) {
    const list = `L${i}`;
    const seats = Math.floor(Math.random() * 101);
    const openingHour = Math.floor(Math.random() * 24);
    const closingHour = openingHour + Math.ceil(Math.random() * (24 - openingHour)) + (Math.floor((Math.random() * 2)) ? 0.5 : 0);
    generateListing(list, seats, openingHour, closingHour);
  }
})();
