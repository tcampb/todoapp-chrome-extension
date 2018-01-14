const express = require('express');
const router = express.Router();
const userModel = require('../models/model/user');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

/* GET home page. */
router.post('/', (req, res, next) => {
    req.url = '/dashboard';
    next();
//     console.log("wdadwwad");
//     let decoded;
//     let token;
//     try {
//         console.log("2222222222222222222");
//         token = req.header('x-auth') || req.body.token;
//         decoded = jwt.verify(token, config.secret);
//     } catch (e) {
//         next(e);
//     }
//     userModel.findOne({
//         where: {
//             id: decoded.id
//         }
//     })
//     .then((user) => {
//         res.locals.user = user;
//         next2();
//   })
});

module.exports = router;