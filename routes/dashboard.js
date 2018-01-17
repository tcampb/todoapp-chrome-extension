const express = require('express');
const router = express.Router();
const getTasks = require('../models/query/getTask');

//If auth successful, user = res.locals.user
router.get('/', (req, res, next) => {
    //Redirect user to signin page if not logged in
    if (!res.locals.user) res.redirect('/');
    else {
        getTasks.find_all_task(res.locals.user.id,['title','content', 'enddate']).then(allTasks=>{
                const task = allTasks.map(task => {
                    console.log(task);
                    return {
                        title:task.title,
                        content:task.content,
                        due: task.enddate
                    }
                });
                console.log(task);
                res.render('dashboard', {
                    tasks: task
                })
        })
    }
})

module.exports = router;