const express = require('express');
const router = express.Router();
const userModel = require('../models/table/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const _ = require('lodash');
const isAuthorized = require('../auth');
const passport = require('../config/passport-setup');

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

//Sign-in with Google Oauth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
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
    res.cookie('session', userRecord.token);
    res.send({'url':'/dashboard'});
    // res.header('x-auth', userRecord.token).json(userRecord);
  })
  .catch((err) => {
    res.status(400).send(err)
   })
  })
  
module.exports = router;
