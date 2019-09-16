-- DROP DATABASE IF EXISTS reservations_service;

-- CREATE DATABASE reservations_service;
\c reservations_service;

DROP TABLE IF EXISTS restaurants CASCADE;

CREATE TABLE restaurants (
  rest_id SERIAL PRIMARY KEY,
  total_capacity int NOT NULL,
  starting_time varchar(50),
  ending_time varchar(50)
);

COPY restaurants FROM '/Users/Admin/Documents/HRSF122/sdc-project/restaurants.csv' DELIMITER ',' CSV HEADER;

DROP TABLE IF EXISTS reservations CASCADE;

CREATE TABLE reservations (
  reservation_id SERIAL PRIMARY KEY,
  restaurant_foreign_key int,
  reservation_day date,
  reservation_time varchar(50),
  number_of_seats_reserved smallint
);

COPY reservations FROM '/Users/Admin/Documents/HRSF122/sdc-project/reservationsTest.csv' DELIMITER ',' CSV HEADER;