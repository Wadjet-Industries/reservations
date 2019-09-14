/* eslint-disable no-loop-func */
const { Client } = require('pg');
const moment = require('moment');

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

const generateReservations = (restaurant, date, currentRestaurant) => {
  // Loop through each hour that the restaurant is open for
  // if (currentRestaurant % 10000 === 0) {
  // console.log('Time to seed restaurant: c', currentRestaurant);
  // }
  for (let i = restaurant.starting_time; i < restaurant.ending_time; i++) {
    let capacityAvailablePerTimeSlot = restaurant.total_capacity;
    const genRandomAmtOfReservations = Math.floor(Math.random() * (7 - 0) + 0);

    for (let y = 0; y < genRandomAmtOfReservations; y++) {
      if (capacityAvailablePerTimeSlot !== 0) {
        // Generate number of seats to reserve based off of the current capacity
        const seatsToReservePerReservation = Math.floor(Math.random() * (capacityAvailablePerTimeSlot - 1) + 1);
        // Subtract the reserved seats from the total capacity of current time block
        capacityAvailablePerTimeSlot -= seatsToReservePerReservation;

        const reservationObj = {
          restaurant_foreign_key: restaurant.rest_id,
          reservation_day: date,
          reservation_time: i,
          number_of_seats_reserved: seatsToReservePerReservation,
        };
        const insertText = 'INSERT INTO reservations(restaurant_foreign_key, reservation_day, reservation_time, number_of_seats_reserved) VALUES ($1, $2, $3, $4)';
        const values = [reservationObj.restaurant_foreign_key, reservationObj.reservation_day, reservationObj.reservation_time, reservationObj.number_of_seats_reserved];
        client.query(insertText, values, (err, res) => {
          if (err) {
            console.log(err.stack);
          }
        });
      }
    }
  }
};

const generateTimeSlotsPerDay = (numberOfRestaurants) => {
  const currentDateDay = Number(moment().format('DD'));
  const endMonthFullDate = moment().endOf('month');
  const currentMonthLastDay = Number(endMonthFullDate.format('DD'));

  for (let z = 1; z < numberOfRestaurants; z++) {
    const queryText = 'SELECT * FROM restaurant WHERE rest_id = $1';
    const values = [z];
    // For every day until the end of the month, generate reservations
    client.query(queryText, values, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        for (let y = currentDateDay; y < currentMonthLastDay + 1; y++) {
          const currentDayOfMonth = moment().set('date', y).format('YYYY-DD-MM');
          // console.log('Time to seed restaurant: ', z);
          generateReservations(res.rows[0], currentDayOfMonth, z);
        }
      }
    });
  }
};

// Generate restaurants first
const generate_restaurants = (callback) => {
  const numberOfRestaurants = 100000;
  for (let i = 1; i < numberOfRestaurants; i++) {
    const genStartTime = Math.floor(Math.random() * (7 - 4) + 4) + 12;
    const genEndTime = Math.floor(Math.random() * (12 - 10) + 10) + 12;

    const restaurantObj = {
      rest_id: i,
      total_capacity: Math.floor(Math.random() * (20 - 10) + 10),
      starting_time: genStartTime,
      ending_time: genEndTime,
    };
    const insertText = 'INSERT INTO restaurant(total_capacity, starting_time, ending_time) VALUES ($1, $2, $3)';
    const values = [restaurantObj.total_capacity, restaurantObj.starting_time, restaurantObj.ending_time];
    client.query(insertText, values, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        if (i % 10000 === 0 || i % 1000 === 0) {
          console.log('Number of Restaurants inserted:', i);
        }
        if (i === numberOfRestaurants - 1) {
          console.log('Begin generating reservations...');
          callback(numberOfRestaurants);
        }
      }
    });
  }
};
generate_restaurants((numberOfRestaurants) => {
  generateTimeSlotsPerDay(numberOfRestaurants);
});
