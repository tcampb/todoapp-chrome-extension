const express = require('express');
const router = express.Router();
const userModel = require('../models/model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const _ = require('lodash');

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
  userModel.update(
    {primary_token: token},
    {where: {
      id: userId
    }
  })
  return userRecord;
}

router.get('/', (req, res) => {
  let token = req.header('x-auth') || req.body.token;
  userModel.findByToken(token);
  res.end()
})
.post('/', function(req, res) {
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
    res.header('x-auth', userRecord.token);
    res.json(userRecord);
  })
  .catch((err) => {
    res.status(400).send(err)
   })
  })
  

module.exports = router;
