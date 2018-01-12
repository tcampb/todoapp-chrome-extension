const Sequelize = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcryptjs');
const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        validate: {isEmail:true }
    },
    password: {
        type:Sequelize.STRING
    },
    primary_token:{
        type: Sequelize.STRING
    },
    google_token:{
        type: Sequelize.STRING
    },
    sf_token :{
        type: Sequelize.STRING
    }
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash("test123", salt, (err, hash) => {
                User.sync()
                .then(
                    User.create({
                        firstName: 'Tyler',
                        lastName: 'test',
                        email: 'test2@test.com',
                        password: hash
                    }))
                })
                })
    module.exports = User;