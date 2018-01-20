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

module.exports = router;