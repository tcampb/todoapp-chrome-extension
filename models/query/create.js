const User = require('../table/user'),
Contact = require('../table/contact'),
Task = require('../table/task'),
Contask = require('../table/contask'),
sample = require('./sample.json');

// new Date(Date.UTC(2018,11,20))
// sample code on creating a user,task,contact & contask at the same time
const create_all = async(user_json,task_json,contact_json) => {
    let user = await User.create(user_json);
    let task = await Task.create(task_json);
    task.setUser(user);
    task.save();
    let contact= await Contact.create(contact_json);
    contact.setUser(user);
    contact.save();
    let contask = await Contask.create({});
    contask.setContact(contact);
    contask.setTask(task);
    contask.save();
}

// create_all(sample.sample_data_user,sample.sample_data_task,sample.sample_data_contact);

// find and create contask 

const find_contact_task = async(contacts,task)=>{
    let contact = await Contact.findOne(
        {where:
            {id:contacts}
        }).catch((err) => {return err});
    let contask = await Contask.create({}).catch((err) => {return err});
    contask.setContact(contact);
    contask.setTask(task);
    contask.save().catch((err) => {return err});
}


const find_create_task = async (userid,task) =>{
    let user = await User.findById(userid);
    let newTask = await Task.create(task).catch((err) => {console.log(err)});
    newTask.setUser(user);
    newTask.save();
}

exports.find_create_task_contact = async(userid,task)=>{
    let user = await User.findById(userid);
    let newTask = await Task.create(task);
    newTask.setUser(user);
    newTask.save()
    .then(() => {
        let data = task.contact.split(',');
        if (data[0] != '') {
            data.forEach((contacts) => {
                find_contact_task(contacts,newTask)
            })
        }
    })
    .catch((err) => {return err})
}

// find user id 1 and plug in the task
// find_create_task(3,sample.sample_data_task);


// create contact 
exports.find_create_contact = async (userid,contact) => {
    let user = await User.findById(userid);
    let newContact = await Contact.create(contact);
    newContact.setUser(user);
    newContact.save()
}

// find_create_contact(3,sample.sample_data_contact);


// Create new user
exports.create_user = async(user_json) => {
    let user = await User.create(user_json);
    console.log("Sucessful!, your user id is "+user.dataValues.id);
}


// create connection between contact & tasks

// create_user(sample.sample_data_user);
