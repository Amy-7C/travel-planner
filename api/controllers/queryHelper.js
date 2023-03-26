const pg = require("pg");
const dotenv = require('dotenv').config();

const config = {
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432
};

const pool = new pg.Pool(config);

const query = (text, params) => {
  return new Promise((resolve, reject) => {
    pool.query(text, params)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    })
  })
}

module.exports = {
  query
}