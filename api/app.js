const express = require('express');
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');
const controller = require('./controllers/controller.js');
const auth = require('./routes/auth');
const checkAuth = require('./middleware/checkAuth.js');
const app = express();
const dotenv = require('dotenv').config();

//register middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/src/assets')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", auth);

//endpoints
app.post('/api/users/', controller.createUser);
app.post('/api/users/login', controller.login);
app.post('/api/trips', checkAuth.verifyToken, controller.createTrip);
app.get('/api/trips', checkAuth.verifyToken, controller.getAllTrips);
app.get('/api/trips/:id', checkAuth.verifyToken, controller.getOneTrip);
app.post('/api/trips/:id', checkAuth.verifyToken, controller.deleteTrip)

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

module.exports = {
  app, 
  express
};
