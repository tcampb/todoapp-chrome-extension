const express = require('express');
const router = express.Router();
const user = require('../models/model/user');
// const jwt = require('jsonwebtoken');
const _ = require('lodash');

/* GET users listing. */
router.post('/', function(req, res) {
  let {email, password} = _.pick(req.body, ['email', 'password']);
  
  res.end();
});

module.exports = router;
