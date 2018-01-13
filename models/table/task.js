const Sequelize = require('sequelize'),
sequelize = require('../db'),
User = require('./user');

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
        type:Sequelize.DATEONLY,allowNull:false, defaultValue: Sequelize.NOW,
        validate:{isAfter: String(new Date(Date.now()))}
    },
    enddate: {
        type: Sequelize.DATEONLY, allowNull:false, defaultValue: Sequelize.NOW 
    },
    starttime:{
        type:Sequelize.TIME, defaultValue :Sequelize.NOW
    },
    endtime:{
        type:Sequelize.TIME, defaultValue :Sequelize.NOW
    },
    status : {
         type: Sequelize.BOOLEAN, defaultValue: false
    }
});

Task.belongsTo(User);

// Task.sync()
//     .then(() => {
//         console.log('Created Task table!');
//     });


module.exports = Task;