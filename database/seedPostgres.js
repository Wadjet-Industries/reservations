// const { Client } = require('pg');
/* eslint-disable no-loop-func */
const moment = require('moment');
const fs = require('fs');
const fastcsv = require('fast-csv');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


// const client = new Client({
//   user: 'Admin',
//   host: 'localhost',
//   database: 'reservations_service',
//   port: 5432,
//   password: '',
// });

// client.connect((err) => {
//   if (err) {
//     console.log(err.stack);
//   } else {
//     console.log('connected to node-gres');
//   }
// });

const generateReservations = (numberOfRestaurants) => {
  const reservationsArray = [];
  const numOfReservations = 20000001;
  const currentDateDay = Number(moment().format('DD'));
  const sevenDaysFromToday = currentDateDay + 7;

  for (let i = 1; i < numOfReservations; i++) {
    const randomDayWithinTheWeek = Math.floor(Math.random() * (currentDateDay - sevenDaysFromToday) + sevenDaysFromToday);
    if (i % 100000 === 0) {
      console.log(i);
    }

    const formatedRandomDay = moment().set('date', randomDayWithinTheWeek).format('YYYY-MM-DD', moment.ISO_8601);

    const reservationTime = moment().set({
      hour: Math.floor(Math.random() * (21 - 16) + 16),
      minute: 0,
      second: 0,
      millisecond: 0,
    }).format('HH:mm:ss', moment.ISO_8601);


    const reservationObj = {
      reservation_id: i,
      restaurant_foreign_key: Math.floor(Math.random() * (numberOfRestaurants - 1) + 1),
      reservation_day: formatedRandomDay,
      reservation_time: reservationTime,
      number_of_seats_reserved: Math.floor(Math.random() * (10 - 5) + 5),
    };
    // console.log(reservationObj);
    reservationsArray.push(reservationObj);
  }

  // const csvWriter = createCsvWriter({
  //   path: '/Users/Admin/Documents/HRSF122/sdc-project/reservations.csv',
  //   header: [
  //     { id: 'reservation_id', title: 'reservation_id' },
  //     { id: 'restaurant_foreign_key', title: 'restaurant_foreign_key' },
  //     { id: 'reservation_day', title: 'reservation_day' },
  //     { id: 'reservation_time', title: 'reservation_time' },
  //     { id: 'number_of_seats_reserved', title: 'number_of_seats_reserved' },
  //   ],
  // });
  // const records = reservationsArray;

  // csvWriter.writeRecords(records) // returns a promise
  //   .then(() => {
  //     console.log('...Done');
  //     console.log(records);
  //   })
  //   .catch(() => {
  //     console.log('err');
  //   });
  const ws = fs.createWriteStream('/Users/Admin/Documents/HRSF122/sdc-project/restaurantTest.csv');

  fastcsv
    .write(reservationsArray, { headers: true })
    .pipe(ws)
    .on('finish', () => (console.log('done')))
    .on('end', process.exit);
};


// Generate each Restaurant
const generateRestaurants = () => {
  const numberOfRestaurants = 1000001;
  let restaurantArray = [];

  for (let i = 1; i < numberOfRestaurants; i++) {
    const genStarthour = Math.floor(Math.random() * (16 - 14) + 14);
    const genEndHour = Math.floor(Math.random() * (23 - 21) + 21);

    const startTime = moment().set({
      hour: genStarthour,
      minute: 0,
      second: 0,
      millisecond: 0,
    }).format('HH:mm:ss', moment.ISO_8601);

    const endTime = moment().set({
      hour: genEndHour,
      minute: 0,
      second: 0,
      millisecond: 0,
    }).format('HH:mm:ss', moment.ISO_8601);

    const restaurantObj = {
      rest_id: i,
      total_capacity: Math.floor(Math.random() * (70 - 50) + 50),
      starting_time: startTime,
      ending_time: endTime,
    };
    // console.log(restaurantObj);
    restaurantArray.push(restaurantObj);

    if (i % 10000 === 0) {
      console.log('Restaurant: ', i);
    }
  }
  const csvWriter = createCsvWriter({
    path: '/Users/Admin/Documents/HRSF122/sdc-project/restaurants.csv',
    header: [
      { id: 'rest_id', title: 'rest_id' },
      { id: 'total_capacity', title: 'total_capacity' },
      { id: 'starting_time', title: 'starting_time' },
      { id: 'ending_time', title: 'ending_time' },
    ],
  });
  let records = restaurantArray;

  csvWriter.writeRecords(records) // returns a promise
    .then(() => {
      console.log('...Done');
      console.log(records);
      records = 0;
      restaurantArray = 0;
      generateReservations(numberOfRestaurants);
    })
    .catch(() => {
      console.log('err');
    });
};
generateRestaurants();
