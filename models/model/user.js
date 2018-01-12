const Sequelize = require('sequelize');
const sequelize = require('../db');


const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING, notNull: true
    },
    lastName: {
        type: Sequelize.STRING, notNull: true
    },
    email: {
        type: Sequelize.STRING,
        validate: {isEmail:true,notNull: true }
    },
    password: {
        type:Sequelize.STRING
    },
    primary_token:{
        type: Sequelize.STRING, notNull: true
    },
    google_token:{
        type: Sequelize.STRING, notNull: true
    },
    sf_token :{
        type: Sequelize.STRING, notNull: true
    }


  });

  
  User.sync()
  .then(() => {
      console.log('Created User table!');
    });
    
    module.exports = User;