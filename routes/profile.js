const express = require('express');
const router = express.Router();
const getTasks = require('../models/query/getTask');
const create = require('../models/query/create');
const update = require('../models/query/update');
const moment = require('moment');
const multer = require('multer');
const upload = multer({ dest: 'user_logo/' });

router.get('/', (req, res) => {
    res.render('profile', {
        img: res.locals.user.picture,
        name: `${res.locals.user.firstName} ${res.locals.user.lastName}`,
        email: res.locals.user.email,
        document: 'profile'
    })
})
.post('/', upload.single('picture'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.end();
});

module.exports = router;