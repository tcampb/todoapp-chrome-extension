const express = require('express');
const router = express.Router();
const userModel = require('../models/table/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const _ = require('lodash');
const isAuthorized = require('../auth');
const passport = require('../passport-setup');

const verifyPassword = (password, user) => {
  return bcrypt.compare(password, user.dataValues.password).then((res) => {
    if (res) return user;
    if (err) return err;
    return Error("Invalid password");
  })
}

const generateAuthToken = (user) => {
  let userId = user.dataValues.id;
  let access = 'auth';
  let token = jwt.sign({id: userId, access}, config.secret);
  let userRecord = {id: userId, token};
  return userRecord;
}

router
.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))
.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/dashboard');
})
//Sign-in with email / password
.post('/', (req, res, next) => {
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
    res.cookie('x-auth', userRecord.token);
    res.send({'url':'/dashboard'});
    // res.header('x-auth', userRecord.token).json(userRecord);
  })
  .catch((err) => {
    res.status(400).send(err)
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
        .catch((err) => {
          console.log(err);
        })
      })
    })
  })

module.exports = router;
