const express = require('express');
const router = express.Router();
const getTasks = require('../models/query/getTask');
const update = require('../models/query/update');
const moment = require('moment');
const create = require('../models/query/create');

router.get('/', (req, res) => {
    getTasks.find_all_contact(res.locals.user)
    .then(allContacts => {
        if (!allContacts) return allContacts;
        return allContacts.map(contact => {
            return { 
                id:contact.id,
                name:contact.firstName+" "+contact.lastName
            }
        })
    })
    .then((contact) => {
        res.render('contact', {
            contact: contact,
            document: 'contact',
            img: res.locals.user.picture
        });
    })
})
.post('/', (req, res, next) => {
    const body = req.body;
    create.find_create_contact(res.locals.user.id, body)
    .then(()=>res.send('success'))
    .catch((error) => {
        console.log(error)
        res.status(422).send(error.message)
    })
})

module.exports = router;