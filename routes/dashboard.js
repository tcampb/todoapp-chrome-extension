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
        getTasks.find_all_task(res.locals.user,['id', 'title','content', 'enddate', 'createdAt', 'location', 'status'])
        .then(allTasks=>{
                if (!allTasks) return allTasks;
                return task = allTasks.map(task => {

                    return {
                        id: task.id,
                        title:task.title,
                        content:task.content,
                        due: moment(task.enddate).format('llll'),
                        createdAt: moment(task.createdAt).fromNow(),
                        location: task.location,
                        status: task.status
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
                img: res.locals.user.picture,
                spam:"Filter Tasks"
        })
    })


})

.get('/done',(req,res)=> {
    if(!res.locals.user) res.redirect('/');
    console.log(res.locals.user)
    getTasks.find_done_task(res.locals.user,['id','title','content', 'enddate', 'createdAt', 'location', 'status'])
    .then(allTasks=>{
        if (!allTasks) return allTasks;

        return task = allTasks.map(task => {

            return {
                id: task.id,
                title:task.title,
                content:task.content,
                due: moment(task.enddate).format('llll'),
                createdAt: moment(task.createdAt).fromNow(),
                location: task.location,
                status: task.status
            }
        })
    })
    .catch((err) => {console.log(err)})
    .then((task) => {
        res.render('dashboard', {
        spam:'<i class="green check square icon"></i>Completed',
        tasks: task,
        date: moment().format('l'),
        document: 'dashboard',
        title: 'dashboard',
        img: res.locals.user.picture
    })
    })
})

.get('/due',(req,res)=> {
    if(!res.locals.user) res.redirect('/');
    getTasks.find_overdue_task(res.locals.user,['id','title','content', 'enddate', 'createdAt', 'location', 'status'])
    .then(allTasks=>{
        if (!allTasks) return allTasks;
        return task = allTasks.map(task => {
            return {
                id: task.id,
                title:task.title,
                content:task.content,
                due: moment(task.enddate).format('llll'),
                createdAt: moment(task.createdAt).fromNow(),
                location: task.location,
                status: task.status
            }
        })
    })
    .catch((err) => {console.log(err)})
    .then((task) => {
        res.render('dashboard', {
        spam:'<i class="red dont icon"></i>Overdue',
        tasks: task,
        date: moment().format('l'),
        document: 'dashboard',
        title: 'dashboard',
        img: res.locals.user.picture
    })
    })
})

.get('/date',(req,res)=> {
    if(!res.locals.user) res.redirect('/');
    getTasks.find_order_date(res.locals.user,['id','title','content', 'enddate', 'createdAt', 'location', 'status'])
    .then(allTasks=>{
        if (!allTasks) return allTasks;
        return task = allTasks.map(task => {
            return {
                id: task.id,
                title:task.title,
                content:task.content,
                due: moment(task.enddate).format('llll'),
                createdAt: moment(task.createdAt).fromNow(),
                location: task.location,
                status: task.status
            }
        })
    })
    .catch((err) => {console.log(err)})
    .then((task) => {
        res.render('dashboard', {
        spam:'<i class="calendar icon"></i>Date',
        tasks: task,
        date: moment().format('l'),
        document: 'dashboard',
        title: 'dashboard',
        img: res.locals.user.picture
    })
    })
})




module.exports = router;