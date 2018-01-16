const express = require('express');
const router = express.Router();
const dns = require('dns');
const _ = require('lodash');
const userModel = require('../models/table/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})
.get('/login', function(req, res, next) {

})
.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
})
.post('/login', function(req, res) {
  let {email, password} = _.pick(req.body, ['email', 'password']);
  let domain = email.split('@')[1];
  userModel.findOne({
    where: {email}
  })
  .then((user) => {
  let firstName = user.dataValues.firstName;
  dns.resolveMx(domain, (err, address) => {
    address[0].exchange.includes('google') ? res.send({'auth': 'google', 'username': `${firstName}`}) : res.send({'auth': 'email', 'username': `${firstName}`});
  })
  })
});

module.exports = router;
