const express = require('express');
const router = express.Router();
const userModel = require('../models/model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const _ = require('lodash');
const isAuthorized = require('../auth');

const verifyPassword = (password, user) => {
  return bcrypt.compare(password, user.dataValues.password).then((res) => {
    if (res) return user;
    if (err) return err;
    return Error("Fail");
  })
}

const generateAuthToken = (user) => {
  let userId = user.dataValues.id;
  let access = 'auth';
  let token = jwt.sign({id: userId, access}, config.secret);
  let userRecord = {id: userId, token};
  return userRecord;
}

router.post('/', (req, res, next) => {
  let {email, password} = _.pick(req.body, ['email', 'password']);
  userModel.findOne({
    where: {email}
  })
  .then((user) => {
    return verifyPassword(password, user);
  })
  .then((response) => {
    return generateAuthToken(response);
  })
  .then((userRecord) => {
    res.header('x-auth', userRecord.token).json(userRecord);
    next();
  })
  .catch((err) => {
    res.status(400).send(err)
   })
  })
  .post('/auth', (req, res) => {
  isAuthorized(req, res)
  .then((user) => {res.send(JSON.stringify(user))})
  .catch((e) => {
    console.log(e);
  })
  })
  

module.exports = router;
