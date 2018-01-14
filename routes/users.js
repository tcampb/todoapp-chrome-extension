const express = require('express');
const router = express.Router();
const userModel = require('../models/table/user');
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
  //Authenticate request
  .post('/auth', (req, res) => {
  isAuthorized(req, res)
  .then((user) => {res.send(JSON.stringify(user))})
  .catch((e) => {
    res.send(e);
    })
  })
  //Create new user
  .post('/create', (req, res) => {
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
      })
    })
  })

       

module.exports = router;
