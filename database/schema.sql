DROP DATABASE IF EXISTS reservations_service;

CREATE DATABASE reservations_service;

CREATE TABLE restaurant (
  rest_id SERIAL PRIMARY KEY,
  total_capacity int NOT NULL,
  starting_time int,
  ending_time int
);

-- CREATE TABLE time_slot (
--   time_slot_id SERIAL PRIMARY KEY,
--   restaurant_id int REFERENCES restaurant(rest_id),
--   calendar_date date,
--   calendar_time time,
--   number_of_open_seats int,
--   number_of_reserved_seats int
-- );

CREATE TABLE reservations (
  reservation_id SERIAL PRIMARY KEY,
  restaurant_foreign_key int REFERENCES restaurant(rest_id),
  reservation_day text,
  reservation_time int,
  number_of_seats_reserved int
);