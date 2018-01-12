const express = require('express');
const router = express.Router();
const userModel = require('../models/model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const _ = require('lodash');

const veryifyPassword = (password, user) => {
  bcrypt.compare(password, user.dataValues.password, (err, validation) => {
    if (err) return err;
    if (validation) return generateAuthToken(user);
    return Error("Invalid password");
  })
};

const generateAuthToken = (user) => {
  let userId = user.dataValues.id;
  let access = 'auth';
  let token = jwt.sign({id: userId, access}, config.secret).toString();
  
  return user.update({
    primary_token: token
  }).save().then(() => {
    return token;
  });

}

/* GET users listing. */
router.post('/', function(req, res) {
  let {email, password} = _.pick(req.body, ['email', 'password']);
  userModel.findOne({
    where: {email: `${email}`}
  }).then((user) => veryifyPassword(password, user)).then((token) => {
    res.header('x-auth', token).send("Success")
  }).catch((err) => {
    res.status(400).send(err)
   })
  });



module.exports = router;
