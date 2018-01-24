const Sequelize = require('sequelize'),
sequelize = require('../db'),
User = require('./user');
let today= new Date(Date.now());

const Task = sequelize.define('task',{
    title:{
        type: Sequelize.STRING, allowNull:false,
        validate:{
            notEmpty:{args:true, msg:`hey hey hey, title empty`},
            len:{args:[0,55],msg:`OPS, you have exceed 55 word count!`}
        }
    },
    content : {
        type: Sequelize.TEXT
    },
    location : {
        type: Sequelize.STRING
    },
    startdate:{
        type:Sequelize.DATE,allowNull:false, defaultValue: Sequelize.NOW,
        validate:{isAfter: {
            args:String(new Date(today.setDate(today.getDate()-1))),
            msg:`We don't live in the past, please re-enter your date!`
        }
        }
    },
    enddate: {
        type: Sequelize.DATE, allowNull:false, defaultValue: Sequelize.NOW,
        validate:{notEmpty:{args:true,msg:`hey hey hey, enter a date please`},
        isAfter: {
            args:String(new Date(today.setDate(today.getDate()-1))),
            msg:`We don't live in the past, please re-enter your date!`
        }
    }
    },
    status : {
         type: Sequelize.BOOLEAN, defaultValue: false
    },
    is_sf_task : {
        type: Sequelize.BOOLEAN, defaultValue: false
    }
});

Task.belongsTo(User);
module.exports = Task;