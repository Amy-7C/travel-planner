const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const checkAuth = require('../middleware/checkAuth.js');

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  /* 
    validate if user exists
    if found return true
    otherwise send back an error message
    return res.status(400).json({"errors": [{"msg": "user exists"}]})
  */
  //hash user submitted password
  const hashedPass = await bcrypt.hash(password, 10);
  //save the hashed pass to the database
  //send a JWT token back to client
  const token = await JWT.sign({
    email
  }, 
    process.env.SECRET, {
      expiresIn: '24h'
  });
  res.json({
    token
  });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  //validate that user exists
  //compared salted password to the user submitted pass
  const isMatch = bcrypt.compare(password, user.password);
  //if (!isMatch) respond with error 400
  const token = await JWT.sign({
    email
  }, 
    process.env.SECRET, {
      expiresIn: '24h'
  });
  // res.json({
  //   token
  // });
  return token;
});

// router.get('/private', checkAuth, (req, res) => {
//   res.json(privatePosts)
// })

/*
  json web token in header to authorize allowing ot see logged in content
*/
module.exports = router;