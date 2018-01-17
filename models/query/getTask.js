const User = require('../table/user'),
Contact = require('../table/contact'),
Task = require('../table/task'),
Contask = require('../table/contask'),
Sequelize = require('sequelize'),
Op = Sequelize.Op;

const print = (data)=>{
    data.forEach(data=>{data.dataValues});
}
    exports.find_all_task = async(user,arr) =>{
    let validate = {where:{userId:user},attributes:arr};
    let tasks = await Task.findAll(validate);
    // print(tasks);
    console.log(tasks);
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