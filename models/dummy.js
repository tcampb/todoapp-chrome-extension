const User = require('./model/user');
const Contact = require('./model/contact');
const Task = require('./model/task');
const Contask = require('./model/contask');


// drop all tables
// drop table users cascade; drop table contacts cascade; drop table tasks cascade; drop contasks tasks cascade;
// useful methods :
// findOrCreate, min,max,sum,

// sample code on creating a user,task,contact & contask at the same time
// User.create({
//     firstName:'Eric',
//     lastName:'Yii',
//     phone:'8135059701',
//     email:'hhahahaa@gmail.com',
//     password:'321321321dsadsad',
//     primary_token:'321321ewqewqewq',
//     google_token:'dsdsadsadsadadsa',
//     sf_token:'dsdsdsdsdsdsdsds'
// })
// .then(user => {
//     Task.create({
//         title:'gotta get some tea later',
//         content:'get tea with lisa at starbucks',
//         location:'starbucks',
//     }).then(task => {
//         task.setUser(user);
//         task.save();
//         Contact.create({
//             firstName:'Tyler',
//             lastName:'Campell',
//             email:'tcampb@gmail.com'
//         }).then(contact => {
//             contact.setUser(user);
//             contact.save();
//             Contask.create({}).then(contask=>{
//                 contask.setContact(contact);
//                 contask.setTask(task);
//                 contask.save();
//             })
//         })
//     })
// }
// )

// demo to create task(s) for 'the' user

User.findOne({
    where: {
        // find the user before creating the task
        id: 1
    }
}).then((user)=>{
    // now we create the task!
    Task.create({
        title:'lunch',
        content:'hmmmmm',
        location:'farm burger',
        // (js date format is year, month,day)
        startdate:new Date(Date.UTC(2018,11,20)),
    }).then(task =>{
        task.setUser(user);
        task.save();
    })
})

// demo to find user's all task




