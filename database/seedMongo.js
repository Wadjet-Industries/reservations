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

const generateSeatsPerTime = (openHour, closeHour) => {
  const all = [];
  const totalSeats = Math.floor(Math.random() * 101);
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

// const generateDocumentPerDay = (month, day, year) => {
//   const allDays = [];
//   const monthDays = daysInMonth(month, year);
//   for (let i = 0; i < 100; i++) {
//     if (monthDays < day) {
//       day = 1;
//       if(month === 12) {
//         month = 1;
//         year += 1;
//       } else {
//         month += 1;
//       }
//     }
//     const currentDate = `m${month}-d${day}-y${year}`
//     allDays.push(generateDocumentPerTime(currentDate));
//     day++;
//   }
//   return Promise.all(allDays);
// }


// (() => {
//   const allData = [];
//   for (let i = 1; i <= 50; i++) {
//     const list = `L${i}`;
//     const seats = Math.floor(Math.random() * 101);
    const openingHour = Math.floor(Math.random() * 24);
    const closingHour = openingHour + Math.ceil(Math.random() * (24 - openingHour)) + (Math.floor((Math.random() * 2)) ? 0.5 : 0);
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
