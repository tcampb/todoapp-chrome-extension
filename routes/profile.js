const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/images/user_logo/' });
const User = require('../models/table/user');

router.get('/', (req, res) => {
    res.render('profile', {
        img: res.locals.user.picture,
        name: `${res.locals.user.firstName} ${res.locals.user.lastName}`,
        email: res.locals.user.email,
        document: 'profile'
    })
})
.post('/', upload.single('picture'), (req, res) => {
    User.update({picture: `images/user_logo/${req.file.filename}`}, {where: {id: res.locals.user.id}})
    .then(res.status(201).send())
    .catch((err) => {res.status(400).send(err)});
});

module.exports = router;