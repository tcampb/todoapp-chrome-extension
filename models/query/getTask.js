const User = require('../table/user'),
Contact = require('../table/contact'),
Task = require('../table/task'),
Contask = require('../table/contask'),
Sequelize = require('sequelize'),
Op = Sequelize.Op;

const print = (data)=>{
    data.forEach(data=>console.log(JSON.stringify(`${data}`)));
}
    exports.find_all_task = async(user,arr) =>{
    let validate = {where:{userId:user},attributes:arr};
    let tasks = await Task.findAll(validate);
    // print(tasks);
    return tasks;
}

// find_all_task(3,['title','content']);

exports.find_all_contact = async(user) => {
    let validate = {where:{userId:user}};
    let contacts = await Contact.findAll(validate);
    // print(contacts);
    return contacts;
}

// find_all_contact(1);

// find upcoming task, order by date
exports.find_task_by_date = async (date) =>{
    let validate = {where:{startdate:{[Op.gte]:date}}};
    let tasks = await Task.findAll(validate);
    print(tasks);
}
// find_task_by_date('2018-10-12');



// find task by id and all related contacts
exports.find_task_by_id = async (id) => {
    let task = await Task.findById(id);
    return task;
}

//find all contacts related to a task
exports.find_related_contacts = async (task) => {
    let validate = {where:{taskId: task.id}};
    let contasks = await Contask.findAll(validate);
    let contactIds = contasks.map((contask) => {
        return contask.dataValues.contactId;
    })
    let relatedContacts = await Contact.findAll({
        where: {
            id: contactIds
        }
    })
    
    return {relatedContacts, task}
}