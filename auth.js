const express = require('express');
const router = express.Router();
const userModel = require('./models/table/user');
const jwt = require('jsonwebtoken');
const config = require('./config.json');

module.exports = isAuthorized = (req, res, next) => {
    let decoded;
    let token;
    let userId;
    if (!req.user && false) {
        res.redirect('/');
    } else if (req.user) {
        userId = req.user.dataValues.id;
    } else {
        try {
            token = req.cookies['x-auth'];
            decoded = jwt.verify(token, config.secret);
            userId = decoded.id;
        } catch (e) {
            next(e);
        }
    }
    // Decoded variable will contain the decoded payload if signature is valid
    return userModel.findOne({
        where: {
            id: userId
        }
    })
    .then((user) => {
        // return user;
        res.locals.user = user;
        next();
  })
}
