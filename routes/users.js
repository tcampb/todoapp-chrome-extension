const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const _ = require('lodash');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
}).post('/', (req, res, next) => {

});

module.exports = router;
