const Sequelize = require('sequelize');
const sequelize = require('../db');


const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING, allowNull:false
    },
    lastName: {
        type: Sequelize.STRING
    },
    phone:{
        type:Sequelize.BIGINT(11),
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
//   User.sync({force:true})
//   .then(() => {
//       console.log('Created User table!');
//   });

    
    module.exports = User;