const Sequelize = require('sequelize'),
sequelize = require('../db'),
User = require('./user');

const Task = sequelize.define('task',{
    title:{
        type: Sequelize.STRING
    },
    content : {
        type: Sequelize.TEXT
    },
    status : {
         type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
    }
});

Task.belongsTo(User);

Task.sync()
    .then(() => {
        console.log('Created Task table!');
    });


module.exports = Task;