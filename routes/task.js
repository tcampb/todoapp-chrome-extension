const express = require('express');
const router = express.Router();
const getTasks = require('../models/query/getTask');
const update = require('../models/query/update');
const create = require('../models/query/create');
const deleto = require('../models/query/delete');
const sf = require('../models/table/salesforce');
const moment = require('moment');
//GET createTask page
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
        res.render('createTask',{
            contact: contact,
            document: 'createTask',
            img: res.locals.user.picture
        })
    })
})
//GET individual task
.get('/:id', (req, res) => {
    const taskId = req.params.id;
    return getTasks.find_task_by_id(taskId)
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
            contacts: contacts,
            document: 'task',
            id: task.id,
            title: task.title,
            content: task.content,
            due: moment(task.enddate).format('llll'),
            location: task.location,
            img: res.locals.user.picture
        })
    })
})
//Update individual task
.put('/:id', (req, res) => {

    let userId = res.locals.user.id;
    let taskId = req.params.id;
    let data = req.body;
    if (data.isSFTask) {
        sf.sfConn(res.locals.user)
        .then((conn) => {sf.update_sf_task(conn, userId, taskId, data)})
        .then(() => {res.status(202).send({"message":"success"})})
        .catch((err) => {res.status(500).end()})
    } else {
        update.change_task_info(userId, taskId, data)
        .then(() => {
            res.status(202).send({"message":"success"});
        })
        .catch((err) => {
            res.status(500).end();
        })
    }
})
//Create new task
.post('/', (req, res, next) => {
    const body = req.body;
    create.find_create_task_contact(res.locals.user.id, body)
    .then(() => {
        res.status(201).send("success");
    })
    .catch((err) => {
        res.status(422).end(err.message);
    })
})
//Delete task
.delete('/',(req,res) => {
    let key = Object.keys(req.body);
    key.forEach(key => { deleto.delete_a_task(res.locals.user.id,key)
        .then(()=>{
            res.send('success');
        })
        .catch(error=>{
            res.send(error)
        })
     })
})

module.exports = router;