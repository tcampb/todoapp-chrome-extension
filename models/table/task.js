const Sequelize = require('sequelize'),
sequelize = require('../db'),
User = require('./user');
let today= new Date(Date.now());
console.log(Date(Date.now()+"UTC"));

const Task = sequelize.define('task',{
    title:{
        type: Sequelize.STRING, allowNull:false
    },
    content : {
        type: Sequelize.TEXT
    },
    location : {
        type: Sequelize.STRING
    },
    startdate:{
        type:Sequelize.DATE,allowNull:false, defaultValue: Sequelize.NOW,
        validate:{isAfter: String(new Date(today.setDate(today.getDate()-1)))}
    },
    enddate: {
        type: Sequelize.DATE, allowNull:false, defaultValue: Sequelize.NOW 
    },
    // starttime:{
    //     type:Sequelize.TIME, defaultValue :Sequelize.NOW
    // },
    // endtime:{
    //     type:Sequelize.TIME, defaultValue :Sequelize.NOW
    // },
    status : {
         type: Sequelize.BOOLEAN, defaultValue: false
    }
});

Task.belongsTo(User);
module.exports = Task;