const {username} = require('../config.json')
const Sequelize = require('sequelize');
const sequelize = new Sequelize('taskdb',`${username}`,'', {
    host: 'localhost',
    dialect:'postgres'
});


module.exports = sequelize;

