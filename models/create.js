const User = require('./model/user'),
Task = require('./model/task'),
Contact = require('./model/contact'),
Contask = require('./model/contask');




User.sync({force:true})
.then(() => {
    Task.sync({force:true}).then(()=>{
        Contact.sync({force:true}).then(()=>{
            Contask.sync({force:true}).then(()=>{
            })
        })
    })
  }
);

// User.sync({force:true})
// .then(Task.sync({force:true}))
// .then(Contact.sync({force:true}))
// .then(Contask.sync({force:true}))
// .then(result)