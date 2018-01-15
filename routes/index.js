const express = require('express');
const router = express.Router();
const dns = require('dns');
const _ = require('lodash');


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
  let {email} = _.pick(req.body, ['email']);
  let domain = email.split('@')[1];
  dns.resolveMx(domain, (err, address) => {
    address[0].exchange.includes('google') ? res.send({'auth': 'google'}) : res.send({'auth': 'email'});
  });
});

module.exports = router;
