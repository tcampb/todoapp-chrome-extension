const {username} = require('../config/config.json')
const Sequelize = require('sequelize');
const sequelize = new Sequelize('task-db',`${username}`,'', {
    host: 'localhost',
    dialect:'postgres',
    logging:false,
    operatorsAliases: false
});


module.exports = sequelize;