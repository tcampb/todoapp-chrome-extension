const Sequelize = require('sequelize'),
sequelize = require('../db'),
Task = require('./task'),
Contact = require('./contact');

const Contask = sequelize.define('contask',{

});

Contask.belongsTo(Task);
Contask.belongsTo(Contact);

module.exports = Contask;