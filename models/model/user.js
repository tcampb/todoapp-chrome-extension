const Sequelize = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');
const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING, allowNull:false
    },
    lastName: {
        type: Sequelize.STRING,

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
        allowNull:false
    },
    google_token:{
        type: Sequelize.STRING,
    },
    sf_token :{
        type: Sequelize.STRING,
    }
  });
//   User.sync({force:true})
//   .then(() => {
//       console.log('Created User table!');
//   });



///////// TEST CREATE USER WITH ENCRYPTED PASSWORD

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash("test123", salt, (err, hash) => {
//                 User.sync()
//                 .then(
//                     User.create({
//                         firstName: 'Tyler',
//                         lastName: 'test',
//                         email: 'test2@test.com',
//                         password: hash,
//                         google_token: "adwadwadawdwadawwdad",
//                         sf_token: "awdwaawdwaadwdwawd"
//                     }))
//                 })
//                 })

    
 module.exports = User;