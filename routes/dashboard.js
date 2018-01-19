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
        getTasks.find_all_task(res.locals.user.id,['id', 'title','content', 'enddate', 'createdAt', 'location']).then(allTasks=>{
                const task = allTasks.map(task => {
                    return {
                        id: task.id,
                        title:task.title,
                        content:task.content,
                        due: moment(task.enddate).format('llll'),
                        createdAt: moment(task.createdAt).fromNow(),
                        location: task.location
                    }
                });
                res.render('dashboard', {
                    tasks: task,
                    date: moment().format('l'),
                    document: 'dashboard',
                    title: 'dashboard'
                })
        })
    }
})
//Retrieve infomation about a specific task
.get('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    getTasks.find_task_by_id(taskId)
    .then((task) => {
        return getTasks.find_related_contacts(task)
    }).then((contactTaskObject) => {
        const task = contactTaskObject.task;
        const contacts = contactTaskObject.relatedContacts.map((contact) => {
            return {
                id: contact.id,
                firstName: contact.firstName,
                lastName: contact.lastName,
                email: contact.email
            }
        });
        res.render('task', {
            contacts
        })
    })
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
            contact: contact,
            document: 'createTask'
        });
    })
}
})
//Retrieves contacts page
// .get('/contacts', (req, res) => {
//     //Redirect user to sign-in page if not logged in
//     if (!res.locals.user) res.redirect('/');
//     else {

//     }
// })
.post('/create-task', (req, res, next) => {
    const body = req.body;
    try {
        create.find_create_task_contact(res.locals.user.id, body);
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