CREATE KEYSPACE IF NOT EXISTS reservations_service WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};

DROP TABLE IF EXISTS reservations_service.restaurants;

CREATE TABLE reservations_service.restaurants (
  rest_id int,
  total_capacity int,
  starting_time time,
  ending_time time,
  PRIMARY KEY (rest_id, total_capacity, starting_time, ending_time)
);

COPY reservations_service.restaurants (rest_id, total_capacity, starting_time, ending_time) FROM '/Users/Admin/Documents/HRSF122/sdc-project/restaurantsCassandra.csv' WITH DELIMITER=',' AND HEADER=TRUE;

DROP TABLE IF EXISTS reservations_service.reservations;

CREATE TABLE reservations_service.reservations (
  reservation_id int,
  rest_id int,
  reservation_day text,
  reservation_time text,
  number_of_seats_reserved int,
  total_capacity int,
  PRIMARY KEY (rest_id, reservation_day,reservation_id)
);

COPY reservations_service.reservations (reservation_id, rest_id, reservation_day, reservation_time, number_of_seats_reserved, total_capacity) FROM '/Users/Admin/Documents/HRSF122/sdc-project/reservationsCassandra.csv' WITH DELIMITER=',' AND HEADER=TRUE;

