const User = require('../table/user'),
jsforce = require('jsforce'),
async = require('async'),
Contact = require('../table/contact'),
Task = require('../table/task'),
Contask = require('../table/contask'),
Sequelize = require('sequelize'),
Sf = require('../table/salesforce')
Op = Sequelize.Op;

const print = (data)=>{
    data.forEach(data=>console.log(JSON.stringify(`${data}`)));
}
    exports.find_all_task = async(user,arr) =>{
    let validate = {where:{userId:user.id},attributes:arr};
    let tasks = await Task.findAll(validate);
    let sfConn = await Sf.sfConn(user);
    let sfTasks = await Sf.find_sf_tasks(user, sfConn);
    
    return tasks.concat(sfTasks);
}

// find_all_task(3,['title','content']);

exports.find_all_contact = async(user) => {
    let validate = {where:{userId:user.id}};
    let contacts = await Contact.findAll(validate).catch((err) => {return null});
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

exports.find_done_task = async(user) =>{
    let validate_user = {where:{userId:user.id,status:true}};
    let tasks = await Task.findAll(validate_user);
    return tasks;
}

exports.find_overdue_task = async (user) => {
    let validate = {where:{enddate:{[Op.lt]:new Date()},status:false}};
    let tasks = await Task.findAll(validate);
    return tasks;
}

exports.find_order_date = async (user) => {
    let validate = {order:[['enddate']]};
    let tasks = await Task.findAll(validate);
    return tasks;
}

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

// const sfConn = (user) => {
//     return new Promise(resolve => {
//         const conn = new jsforce.Connection({ instanceUrl: user.sf_instance, accessToken : user.sf_token });
//         resolve(conn)
//     })
// }


// const find_sf_tasks = (user, conn) => {
//     // const conn = new jsforce.Connection({ instanceUrl: user.sf_instance, accessToken : user.sf_token });
//     return new Promise(resolve => {
//     conn.query("SELECT ActivityDate, subject, description, whoId FROM Task", function(err, result){
//         let taskArray = result.records;
//         let updatedArray = [];
//         async.each(taskArray, (task, next) => {
//             if (task.WhoId.startsWith('00Q')) {
//                 conn.query(`SELECT id, FirstName, LastName FROM Lead WHERE id = '${task.WhoId}'`, function(err, result){
//                     task.name = result.records[0].FirstName + ' ' + result.records[0].LastName;
//                     updatedArray.push(task);
//                     next();
//                 })
//             } else {
//                 conn.query(`SELECT id, FirstName, LastName FROM Contact WHERE id = '${task.WhoId}'`, function(err, result){
//                     task.name = result.records[0].FirstName + ' ' + result.records[0].LastName;
//                     updatedArray.push(task);
//                     next();
//                 })
//             }
//         }, function(err) {
//             if (err) {return []}
//             else {resolve(updatedArray)}
//         })
//     })
// })
// }