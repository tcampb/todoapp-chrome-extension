const express = require('express');
const router = express.Router();
const getTasks = require('../models/query/getTask');
const create = require('../models/query/create');
const update = require('../models/query/update');
const deleto = require('../models/query/delete');
const moment = require('moment');

//Retrieves dashboard page if user successfully logs in
router.get('/', (req, res, next) => {
    //Redirect user to sign-in page if not logged in
    // if (!1) res.redirect('/');
    // else {
        getTasks.find_all_task(1,['id', 'title','content', 'enddate', 'createdAt', 'location']).then(allTasks=>{
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
    // }
})

.delete('/',(req,res)=>{
    let key =Object.keys(req.body);
    key.forEach(key => { deleto.delete_a_task(1,key)
        .then(()=>{
            res.send('success');
        })
        .catch(error=>{
            res.send(error)
        })
     })
})




//Retrieve infomation about a specific task
.get('/tasks/:id', (req, res) => {
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
            location: task.location
        })
    })
})
.put('/tasks/update-task/:id', (req, res) => {
    let userId = 1;
    let taskId = req.params.id;
    let data = req.body;
    update.change_task_info(userId, taskId, data)
    .then(() => {
        res.status(202).end();
    })
    // .catch((err) => {
    //     res.status(500).end();
    // })
})
//Retrieves create tasks page
.get('/tasks', (req, res) => {
    //Redirect user to sign-in page if not logged in
    // if (!1) res.redirect('/');
    // else {
    getTasks.find_all_contact(1).then(allContacts => {
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
// }
})

// List all contacts from a user
.get('/contacts',(req,res,next)=>{
    getTasks.find_all_contact(1).then(allContacts => {
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

})

//Retrieves contacts page
// .get('/contacts', (req, res) => {
//     //Redirect user to sign-in page if not logged in
//     if (!1) res.redirect('/');
//     else {

//     }
// })
.post('/create-task', (req, res, next) => {
    const body = req.body;
    // try {
        create.find_create_task_contact(1, body)
        .then(()=>{
            res.end('success');
        })
        .catch((error) =>{
            res.status(422).send(error.message);
        })

    // } catch (err) {
    //     res.end(err);
    // } res.end();
})
.post('/create-contact', (req, res, next) => {
    const body = req.body;
    try {
        create.find_create_contact(1, body);
    } catch (error) {
        res.status(422).send(error.message);
    }
})


module.exports = router;