const Sequelize = require('sequelize');
const sequelize = require('../db');


const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING, allowNull:false
    },
    lastName: {
        type: Sequelize.STRING,

    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {isEmail:true }
    },
    password: {
        type:Sequelize.STRING,
        allowNull:false
    },
    primary_token:{
        type: Sequelize.STRING,
        allowNull:false
    },
    google_token:{
        type: Sequelize.STRING,
        allowNull:false
    },
    sf_token :{
        type: Sequelize.STRING,
        allowNull:false
    }


  });

  
  User.sync()
  .then(() => {
      console.log('Created User table!');
    });
    
    module.exports = User;