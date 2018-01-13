const Sequelize = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');
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

  User.findByToken = (token) => {
    let decoded;
    
    try {
        decoded = jwt.verify(token, config.secret);
    } catch (e) {
        return Promise.reject();
    }
    return User.findOne({
        where: {
            id: decoded.id,
            token
        }
    });
  }

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