CREATE DATABASE travelplanner;

CREATE TABLE IF NOT EXISTS users (
  u_id SERIAL NOT NULL PRIMARY KEY,
  username VARCHAR(25) NOT NULL UNIQUE, 
  password VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS trips (
  trip_id SERIAL NOT NULL PRIMARY KEY,
  description VARCHAR(255), 
  date_start DATE,
  date_end DATE,
  u_id INT REFERENCES users (u_id)
);

CREATE TABLE IF NOT EXISTS days (
  day_id SERIAL NOT NULL PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  trip_id INT REFERENCES trips(trip_id)
);

CREATE TABLE IF NOT EXISTS bucketlist (
  bucketlist_id SERIAL NOT NULL PRIMARY KEY,
  u_id INT REFERENCES users(u_id) UNIQUE
);


CREATE TABLE IF NOT EXISTS places (
  place_id SERIAL NOT NULL PRIMARY KEY,
  address text,
  name text,
  category text,
  day_id INT REFERENCES days(day_id),
  bucketlist_id INT REFERENCES bucketlist(bucketlist_id),
  trip_id INT REFERENCES trips(trip_id)
);