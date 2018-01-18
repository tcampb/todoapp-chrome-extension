const express = require('express');
const router = express.Router();
const getTasks = require('../models/query/getTask');
const create = require('../models/query/create');
const moment = require('moment');

//Retrieves dashboard page if user successfully logs in
router.get('/', (req, res, next) => {
    //Redirect user to sign-in page if not logged in
    if (!res.locals.user) res.redirect('/');
    else {
        getTasks.find_all_task(res.locals.user.id,['title','content', 'enddate', 'createdAt', 'location']).then(allTasks=>{
                const task = allTasks.map(task => {
                    return {
                        title:task.title,
                        content:task.content,
                        due: moment(task.enddate).format('llll'),
                        createdAt: moment(task.createdAt).fromNow(),
                        location: task.location
                    }
                });
                res.render('dashboard', {
                    tasks: task,
                    date: moment().format('l')
                })
        })
    }
})
//Retrieves create tasks page
.get('/tasks', (req, res) => {
    //Redirect user to sign-in page if not logged in
    if (!res.locals.user) res.redirect('/');
    else {
    getTasks.find_all_contact(res.locals.user.id).then(allContacts => {
        const contact = allContacts.map(contact => {
            return { 
                id:contact.id,
                name:contact.firstName+" "+contact.lastName
            }
        })
        res.render('createTask',{
            contact:contact
        });
    })
}
})
.post('/create-task', (req, res, next) => {
    const body = req.body;
    try {
        create.find_create_task(res.locals.user.id);
    } catch (err) {
        res.end(err);
    } res.end();
})
.post('/create-contact', (req, res, next) => {
    const body = req.body;
    try {
        create.find_create_contact(res.locals.user.id, body);
    } catch (err) {
        res.end(err);
    } res.end();
})


module.exports = router;