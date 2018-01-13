const express = require('express');
const router = express.Router();
const userModel = require('./models/model/user');
const jwt = require('jsonwebtoken');
const config = require('./config.json');

module.exports = isAuthorized = (req, res, next) => {
    // Decoded variable will contain the decoded payload if signature is valid
    let decoded;
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImFjY2VzcyI6ImF1dGgiLCJpYXQiOjE1MTU4Njk0MTF9.UTIQPjWtm8lO9FSaAiv--vpwsKW1f7qTSA0Rdc3UBf8';
    try {
        // let token = req.header('x-auth') || req.body.token;
        decoded = jwt.verify(token, config.secret);
    } catch (e) {
        next(e);
    }
    userModel.findOne({
        where: {
            id: decoded.id,
            primary_token: token
        }
    })
    .then((user) => {
        res.locals.user = user;
        next();
  })
}
