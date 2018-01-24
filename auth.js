const express = require('express');
const router = express.Router();
const userModel = require('./models/table/user');
const sf = require('./models/table/salesforce');
const jwt = require('jsonwebtoken');
const config = require('./config/config.json');

module.exports = isAuthorized = (req, res, next) => {
    let decoded;
    let token;
    let userId;
    if (req.user) {
        userId = req.user.dataValues.id;
    } else {
        try {
            token = req.cookies['session'];
            if (token) {
                decoded = jwt.verify(token, config.secret);
                userId = decoded.id;
            }
        } catch (e) {
            next(e);
        }
    }
    // Decoded variable will contain the decoded payload if signature is valid
    userModel.findOne({
        where: {
            id: userId
        }
    })
    .then((user) => {
        res.locals.user = user;
        return sf.sfConn(res.locals.user)
  }).then((conn) => {
      res.locals.sfConn = conn;
      next();
  })
  .catch((err) => {
      console.log(err);
  })
}
