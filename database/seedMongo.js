/* eslint-disable no-plusplus */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const mongoose = require('mongoose');
const moment = require('moment');


mongoose.connect('mongodb://localhost:27017/Reservations', { useNewUrlParser: true })
  .then(() => { console.log('Mango be connected'); })
  .catch((error) => { console.log('Mango tree have error ', error); });

const db = mongoose.connection;

db.once('open', () => {
  const reservationSchema = new mongoose.Schema({
    Listing: String,
    Dates: [
      {
        SeatNumber: Number,
        Hours: String,
        Date: String,
        Seats: [
          {
            time: String,
            reservations: {
              open: Number,
              reserved: Number
            }
          }
        ]
      }
    ]
  });

  const ReservationDocument = mongoose.model('Reservation', reservationSchema);
  ReservationDocument.deleteMany({}).exec()
    .then(() => { console.log('Documents Removed'); })
    .catch((err) => { console.log('Error in removing', err); });

  const generateMomentTime = (thisMoment, time) => {
    const date = thisMoment.format().slice(0, 11);
    const timeZone = thisMoment.format().slice(19);
    let hour = Math.floor(time);
    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (time % 1 !== 0) {
      return `${date}${hour}:30:00${timeZone}`;
    }
    return `${date}${hour}:00:00${timeZone}`;
  };

  const generateSeatsPerTimePerDay = (openHour, closeHour, totalSeats, dayMoment) => {
    const all = [];
    const currentStartHour = moment(openHour);
    const currentEndHour = moment(closeHour);

    let durate = moment.duration(currentEndHour.diff(currentStartHour)).as('hours');
    while (durate >= 0) {
      const reserved = Math.floor(Math.random() * (totalSeats + 1));
      const open = totalSeats - reserved;
      const time = currentStartHour.format();
      const dateTime = {
        time,
        reservations: {
          open,
          reserved
        }
      };
      all.push(dateTime);
      currentStartHour.add(30, 'm');
      durate = moment.duration(currentEndHour.diff(currentStartHour)).as('hours');
    }
    return all;
  };

  const generateDatesPerListing = () => {
    const allDays = [];
    const seats = Math.floor(Math.random() * 101);
    const openingHour = Math.floor(Math.random() * 18) + (Math.floor((Math.random() * 2)) ? 0.5 : 0);
    const closingHour = openingHour + Math.ceil(Math.random() * (24 - openingHour)) + (Math.floor((Math.random() * 2)) ? 0.5 : 0);
    const current = moment().local().subtract(2, 'day');

    for (let i = 0; i < 102; i++) {
      const currentDate = current.format();
      const open = generateMomentTime(current, openingHour);
      const close = generateMomentTime(current, closingHour);
      const hours = `${open}--${close}`;
      const thisDate = {
        SeatNumber: seats, Hours: hours, Date: currentDate, Seats: generateSeatsPerTimePerDay(open, close, seats, currentDate)
      };
      current.add(1, 'day');
      allDays.push(thisDate);
    }
    return allDays;
  };

  generateDatesPerListing();

  (() => {
    const allData = [];
    for (let i = 1; i <= 100; i++) {
      const list = `L${i}`;
      const restaurantObj = {
        Listing: list,
        Dates: generateDatesPerListing()
      };
      const restaurant = new ReservationDocument(restaurantObj);
      allData.push(restaurant);
    }
    ReservationDocument.insertMany(allData)
      .then(() => {
        console.log('Mango planted');
        mongoose.disconnect();
      })
      .catch((error) => { console.log('Error with Mango planting', error); });
  })();
});
