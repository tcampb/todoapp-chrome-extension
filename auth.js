const express = require('express');
const router = express.Router();
const userModel = require('./models/model/user');
const jwt = require('jsonwebtoken');
const config = require('./config.json');

module.exports = isAuthorized = (req, res, next) => {
    // Decoded variable will contain the decoded payload if signature is valid
    let decoded;
    let token;
    try {
        token = req.header('x-auth') || req.body.token;
        decoded = jwt.verify(token, config.secret);
    } catch (e) {
        next(e);
    }
    userModel.findOne({
        where: {
            id: decoded.id
        }
    })
    .then((user) => {
        res.locals.user = user;
        req.url = '/dashboard';
        next();
  })
}
