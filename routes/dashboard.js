const express = require('express');
const router = express.Router();
const getTasks = require('../models/query/getTask');
const create = require('../models/query/create');
const update = require('../models/query/update');
const deleto = require('../models/query/delete');
const moment = require('moment');

//Retrieves dashboard page if user successfully logs in
router.get('/', (req, res, next) => {
    // Redirect user to sign-in page if not logged in
    if (!res.locals.user) res.redirect('/');
        getTasks.find_all_task(res.locals.user,['id', 'title','content', 'enddate', 'createdAt', 'location'])
        .then(allTasks=>{
                if (!allTasks) return allTasks;
                return task = allTasks.map(task => {
                    return {
                        id: task.id,
                        title:task.title,
                        content:task.content,
                        due: moment(task.enddate).format('llll'),
                        createdAt: moment(task.createdAt).fromNow(),
                        location: task.location
                    }
                })
        })
        .catch((err) => {console.log(err)})
        .then((task) => {
            res.render('dashboard', {
            tasks: task,
            date: moment().format('l'),
            document: 'dashboard',
            title: 'dashboard',
            img: res.locals.user.picture
        })
    })
})

.delete('/',(req,res)=>{
    let key = Object.keys(req.body);
    key.forEach(key => { deleto.delete_a_task(res.locals.user,key)
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
            location: task.location,
            img: res.locals.user.picture
        })
    })
})
.put('/tasks/update-task/:id', (req, res) => {
    let userId = res.locals.user;
    let taskId = req.params.id;
    let data = req.body;
    update.change_task_info(userId, taskId, data)
    .then(() => {
        res.status(202).end();
    })
    .catch((err) => {
        res.status(500).end();
    })
})
//Retrieves create tasks page
.get('/tasks', (req, res) => {
    getTasks.find_all_contact(res.locals.user)
    .then(allContacts => {
        console.log(allContacts);
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

.get('/contacts',(req,res,next)=>{
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
        create.find_create_task_contact(res.locals.user, body).catch(error =>{res.send(error)});
    } catch (err) {
        res.end(err);
    } res.end();
})
.post('/create-contact', (req, res, next) => {
    const body = req.body;
    try {
        create.find_create_contact(res.locals.user, body);
    } catch (err) {
        res.end(err);
    } res.end();
})


module.exports = router;