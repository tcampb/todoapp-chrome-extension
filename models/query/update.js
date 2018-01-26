const User = require('../table/user');
const Contact = require('../table/contact');
const Task = require('../table/task');
const Contask = require('../table/contask');

const user_change = {
    firstName:'cai',
    lastName:'Kangyong'
}

// change user id or contact id

const change_user_info = async (userId,user_change)=>{
    let user = await User.findById(userId);
    console.log(user.dataValues);
    let latest = await user.update(user_change);
    latest.save();
    console.log(latest.dataValues);
}
// change_user_info(2,user_change);

// change contact info of a user
const contact_change = {
    firstName:'Rich',
    lastName:'Osword'
}

const change_contact_info = async (userId,contactId,contact_change)=>{
    let contact = await Contact.findOne({where:{id:contactId, userId:userId}});
    let latest = await contact.update(contact_change);
    latest.save();
    console.log(latest.dataValues);
}

// change_contact_info(2,2,contact_change);
// const task_change = {
//     title:'Text Preparation',
//     content:'prepare notes for next week exam'
// }

exports.change_task_info = async (userId,taskId,task_change) => {
    let task = await Task.findOne({where:{id:taskId,userId:userId}});
    let latest = await task.update(task_change);
    return latest.save()
}

// change_task_info(2,2,task_change);