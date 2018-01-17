const express = require('express');
const router = express.Router();
const inquiry = require('../models/query/getTask');

//If auth successful, user = res.locals.user
router.get('/', (req, res, next) => {
    //Redirect user to signin page if not logged in
    if (!res.locals.user) res.redirect('/');
    else {
        inquiry.find_all_task(res.locals.user.id,['title','content']).then(allTasks=>{
                const task = allTasks.map(task => {
                    return {
                        title:task.title,
                        content:task.content
                    }
                });
                res.render('dashboard', {
                    tasks: task
                })
        })
    }
})

module.exports = router;