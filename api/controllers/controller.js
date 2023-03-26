const db = require('../controllers/queryHelper.js');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const JWT = require('jsonwebtoken');

async function createUser (req, res) {
  const { username, email, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  const createQuery = `INSERT INTO
    users(username, email, password)
    VALUES($1, $2, $3)
    returning *`;
  const values = [
    username,
    email,
    hashedPass
  ];
  try {
    const { rows } = await db.query(createQuery, values);
    const id = rows[0].u_id;
    const token = await JWT.sign({
      id
    }, 
      process.env.SECRET, {
        expiresIn: '24h'
    });
    res.status(201).send({ token });
  } catch(error) {
    res.status(400).send(error);
  }
};

async function login (req, res) {
  const { username, password } = req.body;
  const text = 'SELECT * FROM users WHERE username = $1';
  try {
    const { rows } = await db.query(text, [req.body.username]);
    if (!rows[0]) {
      return res.status(400).send({'message': 'The credentials you provided is incorrect'});
    }
    console.log(rows[0])
    const isMatch = bcrypt.compare(password, rows[0].password);
    if(!isMatch) {
      return res.status(400).send({ 'message': 'The password you provided is incorrect' });
    }
    const id = rows[0].u_id;
    const token = await JWT.sign({
      id
    }, 
      process.env.SECRET, {
        expiresIn: '24h'
    });
    return res.status(200).send({ token });
  } catch(error) {
    return res.status(400).send(error);
  }
};

async function deleteUser (req, res) {
  const deleteQuery = 'DELETE FROM users WHERE u_id=$1 returning *';
  try {
    const { rows } = await db.query(deleteQuery, [req.user.u_id]);
    if(!rows[0]) {
      return res.status(404).send({'message': 'user not found'});
    }
    return res.status(204).send({ 'message': 'deleted' });
  } catch(error) {
    return res.status(400).send(error);
  }
};

//create trip with title, start date, end date, city, country, u_id (all required)
async function createTrip(req, res) {
  const { title, startDate, endDate, city, country } = req.body;
  const createQuery = `INSERT INTO
    trips(title, date_start, date_end, city, country, u_id)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *`;
    const values = [
      title, 
      startDate, 
      endDate,
      city, 
      country,
      req.user.id
    ];
    try {
      const { rows } = await db.query(createQuery, values);
      res.status(201).send(rows[0]);
    } catch(error) {
      res.status(400).send(error);
    }
};

async function getAllTrips(req, res) {
  const findQuery = `SELECT * FROM trips where u_id = $1`;
    try {
      const { rows } = await db.query(findQuery, [req.user.id]);
      res.status(201).json(rows);
    } catch(error) {
      res.status(400).send(error);
    }
};

async function getOneTrip(req, res) {
  const findQuery = `SELECT * FROM trips where trip_id = $1 AND u_id = $2`;
  try {
    const { rows } = await db.query(findQuery, [req.params.id, req.user.id]);
    if(!rows[0]) {
      return res.status(404).send({'message': 'trip not found'});
    }
    return res.status(200).send(rows[0]);
  } catch(error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  createUser, 
  login, 
  deleteUser, 
  createTrip, 
  getAllTrips, 
  getOneTrip
}

