/* eslint-disable no-plusplus */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

// Data will assume the restaurant serves sushi omakase
// Open from 5:30pm till 10pm, and can sit a maximum number of 20 people
const Promise = require('bluebird');
const mongoose = require('mongoose');
// const emitter = require('')

// emitter.setMaxListers(0);

mongoose.connect('mongodb://localhost/Reservations', { useNewUrlParser: true })
  .then(() => { console.log('Mango be connected'); })
  .catch((error) => { console.log('Mango tree have error ', error); });

const db = mongoose.connection;



const generateListing = (listing, numberOfSeats, openHour, closeHour) => {


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

  // let count = 0;

  //fix my document generation function

  const generateDocumentPerTime = (date) => {
    // console.log('schema', reservationSchema);
    delete db.models[`${date}`];
    const DateCollection = mongoose.model(`${date}`, reservationSchema);

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
    return Promise.all(all);
  };

  const generateDocumentPerDay = (month, day, year) => {
    const allDays = [];
    const monthDays = daysInMonth(month, year);
    for (let i = 0; i < 100; i++) {
      if (monthDays < day) {
        day = 1;
        if(month === 12) {
          month = 1;
          year += 1;
        } else {
          month += 1;
        }
      }
      const currentDate = `m${month}-d${day}-y${year}`
      allDays.push(generateDocumentPerTime(currentDate));
      day++;
    }
    return Promise.all(allDays);
  }

  mongoose.connect(listingURL, { useNewUrlParser: true })
    // .then(() => { console.log('Mango intial connected',listingURL); })
    // .catch((error) => { console.log('Error with Mango Connect', error); return error; })
    // .then(() => (dropCurrentDatabase))
    // .then(() => { console.log('database dropped', listingURL); })
    // .catch((err) => { console.log('could not drop database', err); return err; })
    // .then(() => (currentConnection))
    .then(() => { console.log('Mango final  connected', listingURL); })
    .catch((error) => { console.log('Error with Mango Connect', error, listingURL); })
    .then(() => (generateDocumentPerDay(startMonth, startDay, startYear)))
    .catch((error) => { console.log('Error with day generation', error); });
};



(() => {
  const allData = [];
  for (let i = 1; i <= 50; i++) {
    const list = `L${i}`;
    const seats = Math.floor(Math.random() * 101);
    const openingHour = Math.floor(Math.random() * 24);
    const closingHour = openingHour + Math.ceil(Math.random() * (24 - openingHour)) + (Math.floor((Math.random() * 2)) ? 0.5 : 0);
    allData.push(generateListing(list, seats, openingHour, closingHour));
  }
  Promise.all(allData);
})();
