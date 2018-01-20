const User = require('../table/user'),
Contact = require('../table/contact'),
Task = require('../table/task'),
Contask = require('../table/contask');



// exports.delete_a_task = async (userId,taskId)=> {
//     const task = await Task.findOne({where:{userId:userId, id:taskId}});
//     const contask = await Contask.findAll({where:{taskId:taskId}});
//     contask.forEach(contask=> {contask.destroy()});
//     const elimenate = await task.destroy();
// }

// const delete_a_contact = async(userId,contactId)=> {
//     const contact = await Contact.findOne({where:{userId:userId, id:contactId}});
//     const elimenate = await contact.destroy();
// }

// const delete_account = async(userId)=> {
//     const contact = await Contact.findAll({where:{userId:userId}});
//     const task = await Task.findAll({where:{userId:userId}});
//     const user = await User.findById(userId);
    
//     // const contask = await Contask.findAll({where:{userId:userId}});
//     task.forEach(task=> {task.destroy()});
//     // contask.forEach(contask=> {contask.destroy()});
//     contact.forEach(contact=> {contact.destroy()});
//     user.destroy();

// }

// delete_account(1);



