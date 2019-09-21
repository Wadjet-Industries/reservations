// /* eslint-disable comma-dangle */
// /* eslint-disable import/no-extraneous-dependencies */
// const mongoose = require('mongoose');

// //Changed this from database to localhost:27017 to have it run successfully in local computer
// mongoose.connect('mongodb://localhost:27017/Reservations', { useNewUrlParser: true })
//   .then(() => { console.log('Mango be connected'); })
//   .catch((error) => { console.log('Mango tree have error ', error); });

// db = mongoose.connection;

// const reservationSchema = new mongoose.Schema({
//   Listing: String,
//   Dates: [
//     {
//       Date: String,
//       Seats: [
//         {
//           time: String,
//           reservations: {
//             open: Number,
//             reserved: Number
//           }
//         }
//       ]
//     }
//   ]
// });

// const ReservationDocument =  mongoose.model('Reservation', reservationSchema);

// const getListingData = (listing) => (
//   ReservationDocument.find({ Listing: listing })
// );

// module.exports = {
//   getListingData
// };
