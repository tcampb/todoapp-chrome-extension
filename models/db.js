const {username} = require('..')
const Sequelize = require('sequelize');
const sequelize = new Sequelize('task-db',`${username}`,'', {
    host: 'localhost',
    dialect:'postgres'
});


module.exports = sequelize;

