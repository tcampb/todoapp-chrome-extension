const express = require('express');
const router = express.Router();
const getTasks = require('../models/query/getTask');
const update = require('../models/query/update');
const moment = require('moment');

router.get('/',(req,res,next)=>{
    try{
    getTasks.find_all_contact(res.locals.user).then(allContacts => {
        const contact = allContacts.map(contact => {
            return { 
                id:contact.id,
                name:contact.firstName+" "+contact.lastName
            }
        })
        res.render('contact',{
            contact: contact,
            document: 'contact'
        });
    })
        
    }catch(err){
        res.end(err);
    }
})
.post('/', (req, res, next) => {
    const body = req.body;
    try {
        create.find_create_contact(res.locals.user, body);
    } catch (err) {
        res.end(err);
    } res.end();
})

module.exports = router;