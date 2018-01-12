const User = require('./model/user');
const Contact = require('./model/contact');
const Task = require('./model/task');
const Contask = require('./model/contask');


// framework on creating a user

User.create({
    firstName:'Eric',
    lastName:'Yii',
    phone:'8135059701',
    email:'hhahahaa@gmail.com',
    password:'321321321dsadsad',
    primary_token:'321321ewqewqewq',
    google_token:'dsdsadsadsadadsa',
    sf_token:'dsdsdsdsdsdsdsds'
})
.then(user => {
    Task.create({
        title:'gotta get some tea later',
        content:'get tea with lisa at starbucks',
        location:'starbucks',
    }).then(task => {
        task.setUser(user);
        task.save();
        Contact.create({
            firstName:'Tyler',
            lastName:'Campell',
            email:'tcampb@gmail.com'
        }).then(contact => {
            contact.setUser(user);
            contact.save();
            Contask.create({}).then(contask=>{
                contask.setContact(contact);
                contask.setTask(task);
                contask.save();
            })
        })
    })
}
)




