const User = require('./table/user'),
Task = require('./table/task'),
Contact = require('./table/contact'),
Contask = require('./table/contask');


// Creating or overiding the current db

User.sync({force:true})
.then(() => {
    Task.sync({force:true}).then(()=>{
        Contact.sync({force:true}).then(()=>{
            Contask.sync({force:true}).then(()=>{
                process.exit();
            })
        })
    })
  }
);
