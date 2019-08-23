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
// let startDay;
// let startYear;
// let startMonth;

// (() => {
//   const date = new Date();
//   startDay = date.getDate();
//   startYear = date.getFullYear();
//   startMonth = date.getMonth() + 1;
//   // return `${startYear}-${startMonth}-${startDay}`;
// })();

const daysInMonth = (month, year) => (
  new Date(year, month, 0).getDate()
);

const generateSeatsPerTimePerDay = (openHour, closeHour, totalSeats) => {
  const all = [];

  for (let i = openHour; i <= closeHour; i += 0.5) {
    let time;
    if (i % 1 !== 0) {
      time = `${(i - 0.5)}:30`;
    } else {
      time = `${i}:00`;
    }
    const reserved = Math.floor(Math.random() * (totalSeats + 1));
    const open = totalSeats - reserved;
    const dateTime = {
      time,
      reservations: {
        open,
        reserved
      }
    };
    all.push(dateTime);
  }
  return all;
};

const generateDatesPerListing = (month, day, year) => {
  const allDays = [];
  const monthDays = daysInMonth(month, year);
  const seats = Math.floor(Math.random() * 101);
  const openingHour = Math.floor(Math.random() * 24);
  const closingHour = openingHour + Math.ceil(Math.random() * (24 - openingHour)) + (Math.floor((Math.random() * 2)) ? 0.5 : 0);
  allDays.push({ openingHour, closingHour });
  for (let i = 0; i < 100; i++) {
    if (monthDays < day) {
      day = 1;
      if (month === 12) {
        month = 1;
        year += 1;
      } else {
        month += 1;
      }
    }
    const currentDate = `m${month}-d${day}-y${year}`;
    const thisDate = { [currentDate]: generateSeatsPerTimePerDay(openingHour, closingHour, seats) };
    allDays.push(thisDate);
    day++;
  }
  return allDays;
}


// (() => {
//   const allData = [];
//   for (let i = 1; i <= 50; i++) {
//     const list = `L${i}`;
//     allData.push(generateListing(list, seats, openingHour, closingHour));
//   }
//   Promise.all(allData);
// })();




// //given the month i can generate days
// //given a date I can generate times and push them

// //   const generateDocumentsPerDay = (month, day, year) => {
// //     const numbDays = daysInMonth(month, year);
// //     if (count === 100) {
// //       // eslint-disable-next-line no-useless-return
// //       return;
// //     }
// //     if (day <= numbDays) {
// //       const collectionDate = `M${month}-D${day}-Y${year}`;
// //       generateDocumentPerTime(collectionDate);
// //       count++;
// //       generateDocumentsPerDay(month, day + 1, year);
// //     }
// //     if (numbDays < day) {
// //       if (month === 12) {
// //         generateDocumentsPerDay(1, 1, year + 1);
// //       } else {
// //         generateDocumentsPerDay(month + 1, 1, year);
// //       }
// //     }
// //   };

// //   generateDocumentsPerDay(startMonth, startDay, startYear);
