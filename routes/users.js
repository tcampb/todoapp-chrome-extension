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
  userModel.update(
    {primary_token: token},
    {where: {
      id: userId
    }
  })
  return token;
}

/* GET users listing. */
router.post('/', function(req, res) {
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
  .then((token) => {
    res.header('x-auth', token).send("Success")
  })
  .catch((err) => {
    res.status(400).send(err)
   })
  })
  



module.exports = router;
