const Sequelize = require('sequelize');
const sequelize = require('../db');
console.log("Today Date is :"+ Date(Date.now()+"UTC"));

const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING, allowNull:false
    },
    lastName: {
        type: Sequelize.STRING
    },
    phone:{
        type:Sequelize.BIGINT,
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {isEmail:true }
    },

    password: {
        type:Sequelize.STRING,
        allowNull:true
    },

    googleId: {
        type:Sequelize.STRING,
        allowNull:true
    },

    google_calendar_token:{
        type: Sequelize.STRING,
        allowNull:true
    },

    sf_token :{
        type: Sequelize.STRING,
        allowNull:true
    }
  });


    
    module.exports = User;