const JWT = require('jsonwebtoken');
const db = require('../controllers/queryHelper.js');
const dotenv = require('dotenv').config();

async function verifyToken(req, res, next) {
    const token = req.headers['x-auth-token'];
    if(!token) {
      return res.status(400).send({ 'message': 'Token is not provided'});
    }
    try {
      const decoded = await JWT.verify(token, process.env.SECRET);
      //callback for JWT.verify
      // function (err, decoded) {
      //   if(err){
      //     console.log(err)
      //   } else console.log(decoded.id)
      // }
      const text = 'SELECT * FROM users WHERE u_id = $1';
      const { rows } = await db.query(text, [decoded.id]);
      if(!rows[0]) {
        return res.status(400).send({ 'message': 'The token you provided is invalid' });
      }
      req.user = { id: decoded.id };
      next();
    } catch(error) {
      return res.status(400).send(error);
    }
  }

module.exports = {
  verifyToken
}