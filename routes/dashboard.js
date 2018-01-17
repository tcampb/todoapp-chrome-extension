const express = require('express');
const router = express.Router();
const getTasks = require('../models/query/getTask');
const moment = require('moment');

//If auth successful, user = res.locals.user
router.get('/', (req, res, next) => {
    //Redirect user to signin page if not logged in
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
                    tasks: task
                })
        })
    }
})

module.exports = router;