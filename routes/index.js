const express = require('express');
const router = express.Router();
const dns = require('dns');
const _ = require('lodash');
const userModel = require('../models/table/user');
const bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  //If user session is valid, redirect to dashboard
  res.locals.user ? res.redirect('/dashboard') : res.render('index', { title: 'Login' });
})
.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
})
 //Create new user
.post('/signup', (req, res, next) => {
  let {firstName, lastName, email, password} = _.pick(req.body, ['firstName', 'lastName', 'email', 'password']);
  //Check if email address is currently in use
  userModel.findOne({
    where: {email}
  })
  .then((user) => {
    if (user) res.status(400).send("User already exists");
    else {
    //Encrypt user password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
          userModel.create({
          firstName,
          lastName,
          email,
          password: hash,
          picture: '../images/placeholder.png'
        })
        .then((user) => {
          res.send(user.email);
        })
        .catch((err) => {
          next(err);
        })
    })
  })
}
})
})
.post('/login', function(req, res) {
  let {email, password} = _.pick(req.body, ['email', 'password']);
  let domain = email.split('@')[1];
  userModel.findOne({
    where: {email}
  })
  .then((user) => {
  //If no user exists, throw error
  if (!user) {
    res.status(400).send();
  } else {
  let firstName = user.dataValues.firstName;
  //Lookup email domain
  dns.resolveMx(domain, (err, address) => {
    address[0].exchange.includes('google') ? res.send({'auth': 'google', 'username': `${firstName}`}) : res.send({'auth': 'email', 'username': `${firstName}`});
  })
}
  })
});

module.exports = router;
