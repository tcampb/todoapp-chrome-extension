const User = require('../table/user');
const Contact = require('../table/contact');
const Task = require('../table/task');
const Contask = require('../table/contask');




// demo to find user's all task
// temporary findall, need upgrade
Task.findAll({
    where:{userId:1},
    attributes: ['title','content']
}).then(task =>{
    task.forEach(task=>{
        console.log(task.dataValues)
    })
})

