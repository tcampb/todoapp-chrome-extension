const Sequelize = require('sequelize');
const sequelize = new Sequelize('task-db','Eric','', {
    host: 'localhost',
    dialect:'postgres'
});


module.exports = sequelize;

