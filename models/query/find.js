const User = require('../table/user'),
Contact = require('../table/contact'),
Task = require('../table/task'),
Contask = require('../table/contask'),
Sequelize = require('sequelize'),
Op = Sequelize.Op;

const print = (data)=>{
    data.forEach(data=>{console.log(data.dataValues)});
}


const find_all_task = async(user,arr) =>{
    let validate = {where:{userId:user},attributes:arr};
    let tasks = await Task.findAll(validate);
    print(tasks);
}

find_all_task(1,['title','content']);


// find upcoming task, order by date
const find_task_by_date = async (date) =>{
    let validate = {where:{startdate:{[Op.gte]:date}}};
    let tasks = await Task.findAll(validate);
    print(tasks);
}
// find_task_by_date('2018-10-12');




// const search_all = async (word)=>{

// }