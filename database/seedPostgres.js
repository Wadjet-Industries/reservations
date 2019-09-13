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

const generateReservations = (restaurant, date) => {
  console.log(restaurant);
  // const randomNumberOfSeatsToReserve = Math.floor(Math.random() * (10 - 1) + 1)
  const timeOpen = restaurant.starting_time;
  const timeClose = restaurant.ending_time;
  console.log(restaurant.rest_id, timeOpen, timeClose);
  // for (let timeOpen = )

  const reservationsObj = {
    restaurant_foreign_key: restaurant.rest_id,
    reservation_day: 0,
    reservation_time: 0,
    // number_of_seats_reserved: Math.floor(Math.random() * ),
  };
};

const generateTimeSlotsPerDay = (numberofMonths, numberOfRestaurants) => {
  const currentFullDate = moment().format('YYYY-DD-MM');
  const currentDateDay = Number(moment().format('DD'));

  const endMonthFullDate = moment(currentFullDate).endOf('month');
  const currentMonthLastDay = Number(endMonthFullDate.format('DD'));
  // For every restaurant: generate 1 month of data starting at current date

  for (let z = 1; z < numberOfRestaurants; z++) {
    for (let y = currentDateDay; y < currentMonthLastDay; y++) {
      // For every day until the end of the month, generate reservations

      const queryText = 'SELECT * FROM restaurant WHERE rest_id = $1';
      const values = [z];
      client.query(queryText, values, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          const currentDayOfMonth = moment().set('date', y).format('YYYY-DD-MM');
          generateReservations(res.rows[0], currentDayOfMonth);
        }
      });
    }
  }
};

// Generate restaurants first
const generate_restaurants = (callback) => {
  const restaurantArray = [];
  const numberOfRestaurants = 11;
  for (let i = 1; i < numberOfRestaurants; i++) {
    const genStartTime = Math.floor(Math.random() * (7 - 4) + 4) + 12;
    const genEndTime = Math.floor(Math.random() * (12 - 10) + 10) + 12;
    const startTime = `${genStartTime}:00:00`;
    const endTime = `${genEndTime}:00:00`;
    const restaurantObj = {
      rest_id: i,
      total_capacity: Math.floor(Math.random() * (50 - 10) + 10),
      starting_time: startTime,
      ending_time: endTime,
    };
    const insertText = 'INSERT INTO restaurant(total_capacity, starting_time, ending_time) VALUES ($1, $2, $3)';
    const values = [restaurantObj.total_capacity, restaurantObj.starting_time, restaurantObj.ending_time];
    client.query(insertText, values, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        // console.log(i);
        if (i === 10) {
          callback(3, numberOfRestaurants);
        }
      }
    });
  }
};

// Run the generate_restaurant seeding script
// On callback run the generateTimesSlotsPerDay function based on
// Number of months
generate_restaurants(generateTimeSlotsPerDay);
