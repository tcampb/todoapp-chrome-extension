const express = require('express');
const router = express.Router();
const dns = require('dns');
const _ = require('lodash');
const userModel = require('../models/table/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})
.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
})
 //Create new user
.post('/signup', (req, res) => {
  let {firstName, lastName, email, password} = _.pick(req.body, ['firstName', 'lastName', 'email', 'password']);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        userModel.create({
        firstName,
        lastName,
        email,
        password: hash,
      })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        console.log(err);
      })
    })
  })
})
.post('/login', function(req, res) {
  let {email, password} = _.pick(req.body, ['email', 'password']);
  let domain = email.split('@')[1];
  console.log(domain);
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
