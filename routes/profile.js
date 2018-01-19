const express = require('express');
const router = express.Router();
const getTasks = require('../models/query/getTask');
const create = require('../models/query/create');
const update = require('../models/query/update');
const moment = require('moment');

router.get('/', (req, res) => {
    res.render('profile', {
        img: res.locals.user.picture,
        name: `${res.locals.user.firstName} ${res.locals.user.lastName}`,
        email: res.locals.user.email,
        document: 'profile'
    })
})
.post((req, res) => {
    console.log(req);
    res.end();
});

module.exports = router;