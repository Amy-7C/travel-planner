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
    // console.log(rows[0])
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

async function deleteTrip (req, res) {
  const deleteQuery = 'DELETE FROM trips WHERE u_id = $1 AND trip_id = $2';
  try {
    const rows = await db.query(deleteQuery, [req.user.id, req.params.id]);
    if(rows.rowCount === 0) {
      return res.status(404).send({'message': 'trip not found'});
    }
    return res.status(204).send({ message: 'deleted' });
  } catch(error) {
    return res.status(400).send({message: 'unable to delete'});
  }
};

async function getAllDays(req, res) {
  const findQuery = `SELECT * FROM days where trip_id = $1`;
  try {
    const { rows } = await db.query(findQuery, [req.params.id]);
    res.status(201).json(rows);
  } catch(error) {
    res.status(400).send(error);
  }
}

async function createDay(req, res) {
  const { date } = req.body;
  const createQuery = `INSERT INTO
    days(date, trip_id)
    VALUES($1, $2)
    `;
    const values = [
      date, 
      req.params.id
    ];
    try {
      const { rows } = await db.query(createQuery, values);
      res.status(201).send(rows[0]);
    } catch(error) {
      res.status(400).send(error);
    }
};

async function deleteDay (req, res) {
  //need to delete all places associated with a day
  const deleteQuery = 'DELETE FROM days WHERE day_id = $1';
  try {
    const rows = await db.query(deleteQuery, [req.params.id]);
    if(rows.rowCount === 0) {
      return res.status(404).send({'message': 'trip not found'});
    }
    return res.status(204).send({ message: 'deleted' });
  } catch(error) {
    return res.status(400).send({message: 'unable to delete'});
  }
};

async function createPlace(req, res) {
  const { address, name, category } = req.body;
  const createQuery = `INSERT INTO
    places(address, name, category, day_id)
    VALUES($1, $2, $3, $4)
    `;
    const values = [
      address, 
      name, 
      category,
      req.params.id
    ];
    try {
      const { rows } = await db.query(createQuery, values);
      res.status(201).send(rows[0]);
    } catch(error) {
      res.status(400).send(error);
    }
};

async function deletePlace (req, res) {
  const deleteQuery = 'DELETE FROM places WHERE place_id = $1';
  try {
    const rows = await db.query(deleteQuery, [req.params.id]);
    if(rows.rowCount === 0) {
      return res.status(404).send({'message': 'trip not found'});
    }
    return res.status(204).send({ message: 'deleted' });
  } catch(error) {
    return res.status(400).send({message: 'unable to delete'});
  }
};

async function deleteAllPlaces(req, res) {
  const deleteQuery = `DELETE FROM places WHERE day_id = $1`;
  try {
    const rows = await db.query(deleteQuery, [req.dayId]);
    if(rows.rowCount === 0) {
      return res.status(404).send({'message': 'trip not found'});
    }
    return res.status(204).send({ message: 'deleted' });
  } catch(error) {
    return res.status(400).send({message: 'unable to delete'});
  }
}

async function getAllPlaces(req, res) {
  const findQuery = `SELECT * FROM places where day_id = $1`;
  try {
    const { rows } = await db.query(findQuery, [req.params.id]);
    res.status(201).json(rows);
  } catch(error) {
    res.status(400).send(error);
  }
}

module.exports = {
  createUser, 
  login, 
  deleteUser, 
  createTrip, 
  getAllTrips, 
  getOneTrip, 
  deleteTrip, 
  getAllDays, 
  createDay,
  getAllPlaces, 
  deleteDay, 
  createPlace, 
  deletePlace
}

