const pg = require("pg").Pool;
const dotenv = require('dotenv').config();

const config = {
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
  console.log("connected to the Database");
});

/*User Table*/
const createUsersTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS 
    users (
      u_id SERIAL NOT NULL PRIMARY KEY,
      username VARCHAR(25) NOT NULL UNIQUE, 
      password VARCHAR(60) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE
    );`;
      
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/*Trips Table*/
const createTripsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS 
    trips (
      trip_id SERIAL NOT NULL PRIMARY KEY,
      title VARCHAR(255), 
      date_start DATE,
      date_end DATE,
      city TEXT,
      country TEXT,
      u_id INT REFERENCES users (u_id)
    );`;
      
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

/*Days Table*/
const createDaysTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS 
    days (
      day_id SERIAL NOT NULL PRIMARY KEY,
      date DATE,
      trip_id INT REFERENCES trips(trip_id)
    );`;
      
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/*Bucketlist Table*/
const createBucketlistTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS 
    bucketlist (
      bucketlist_id SERIAL NOT NULL PRIMARY KEY,
      u_id INT REFERENCES users(u_id) UNIQUE
    );`;
      
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/*Places Table*/
const createPlacesTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS 
    places (
      place_id SERIAL NOT NULL PRIMARY KEY,
      address text,
      name text,
      category text,
      day_id INT REFERENCES days(day_id),
      bucketlist_id INT REFERENCES bucketlist(bucketlist_id),
      trip_id INT REFERENCES trips(trip_id)
    );`;
      
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

/*Drop Users Table*/
const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/*Drop Trips Table*/
const dropTripsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS trips returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/*Drop Days Table*/
const dropDaysTable = () => {
  const queryText = 'DROP TABLE IF EXISTS days returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/*Drop Bucketlist Table*/
const dropBucketlistTable = () => {
  const queryText = 'DROP TABLE IF EXISTS bucketlist returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/*Drop Bucketlist Table*/
const dropPlacesTable = () => {
  const queryText = 'DROP TABLE IF EXISTS places returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/*Create All Tables*/
const createAllTables = () => {
  createUsersTable();
  createTripsTable();
  createDaysTable(); 
  createBucketlistTable();
  createPlacesTable();
}

/*Drop All Tables*/
const dropAllTables = () => {
  dropUsersTable();
  dropTripsTable();
  dropDaysTable();
  dropBucketlistTable();
  dropPlacesTable();
}

//export pool and createTable functions to be accessible from anywhere within the application
module.exports = {
  createUsersTable,
  createTripsTable,
  createDaysTable, 
  createBucketlistTable,
  createPlacesTable,
  createAllTables, 
  dropAllTables,
  pool
};

require("make-runnable");