const { Client } = require('pg');
/* eslint-disable no-loop-func */
const moment = require('moment');
const fast_csv = require('fast-csv');
// const fs = require('file-system');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const client = new Client({
  user: 'Admin',
  host: 'localhost',
  database: 'reservations_service',
  port: 5432,
  password: '',
});

client.connect((err) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log('connected to node-gres');
  }
});

const generateReservations = (currentRestaurntObj, currentDay) => {
  const reservationsArray = [];
  for (let i = currentRestaurntObj.starting_time; i < currentRestaurntObj.ending_time; i++) {
    let capacityAvailablePerTimeSlot = currentRestaurntObj.total_capacity;
    const genRandomAmtOfReservations = Math.floor(Math.random() * (7 - 0) + 0);

    for (let y = 0; y < genRandomAmtOfReservations; y++) {
      if (capacityAvailablePerTimeSlot !== 0) {
        // Generate number of seats to reserve based off of the current capacity
        const seatsToReservePerReservation = Math.floor(Math.random() * (capacityAvailablePerTimeSlot - 1) + 1);
        // Subtract the reserved seats from the total capacity of current time block
        capacityAvailablePerTimeSlot -= seatsToReservePerReservation;

        const reservationObj = {
          restaurant_foreign_key: currentRestaurntObj.rest_id,
          reservation_day: currentDay,
          reservation_time: i,
          number_of_seats_reserved: seatsToReservePerReservation,
        };
        // console.log(reservationObj);
        reservationsArray.push(reservationObj);
      }
    }
  }
  console.log(reservationsArray);
  const csvWriter = createCsvWriter({
    path: '/Users/Admin/Documents/HRSF122/sdc-project/reservations.csv',
    header: [
      { id: 'restaurant_foreign_key', title: 'restaurant_foreign_key' },
      { id: 'reservation_day', title: 'reservation_day' },
      { id: 'reservation_time', title: 'reservation_time' },
      { id: 'number_of_seats_reserved', title: 'number_of_seats_reserved' },
    ],
  });
  const records = restaurantArray;

  csvWriter.writeRecords(records) // returns a promise
    .then(() => {
      console.log('...Done');
      console.log(records);
    })
    .catch(() => {
      console.log('err');
    });
};

// Generate each Restaurant
const generateRestaurants = () => {
  const numberOfRestaurants = 1000;
  const currentDateDay = Number(moment().format('DD'));
  const endMonthFullDate = moment().endOf('month');
  const currentMonthLastDay = Number(endMonthFullDate.format('DD'));

  const restaurantArray = [];

  for (let i = 1; i < numberOfRestaurants; i++) {
    // const genStartTime = Math.floor(Math.random() * (7 - 4) + 4) + 12;
    // const genEndTime = Math.floor(Math.random() * (12 - 10) + 10) + 12;

    const genStartTime = 20;
    const genEndTime = 23;

    const restaurantObj = {
      rest_id: i,
      total_capacity: Math.floor(Math.random() * (20 - 10) + 10),
      starting_time: genStartTime,
      ending_time: genEndTime,
    };
    // console.log(restaurantObj);
    restaurantArray.push(restaurantObj);

    // For every restaurant, loop through current date to the end of the month
    // Change date here for data
    for (let y = currentDateDay; y < currentDateDay + 7 + 1; y++) {
      const currentDayOfMonth = moment().set('date', y).format('YYYY-DD-MM');
      generateReservations(restaurantObj, currentDayOfMonth);
      // For every day of each restaurant: generate reservations for each hour
    }
    if (i % 10000 === 0) {
      console.log('Restaurant: ', i);
    }
  }
  const csvWriter = createCsvWriter({
    path: '/Users/Admin/Documents/HRSF122/sdc-project/data.csv',
    header: [
      { id: 'rest_id', title: 'rest_id' },
      { id: 'total_capacity', title: 'total_capacity' },
      { id: 'starting_time', title: 'starting_time' },
      { id: 'ending_time', title: 'ending_time' },
    ],
  });
  const records = restaurantArray;

  csvWriter.writeRecords(records) // returns a promise
    .then(() => {
      console.log('...Done');
      console.log(records);
    })
    .catch(() => {
      console.log('err');
    });
};
generateRestaurants();
