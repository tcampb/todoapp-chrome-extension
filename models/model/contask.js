const Sequelize = require('sequelize'),
sequelize = require('../db'),
Task = require('./task'),
Contact = require('./contact');

const Contask = sequelize.define('contask',{

});

Contask.belongsTo(Contact);
Contask.belongsTo(Task);


Contask.sync()
    .then(() => {
        console.log('Created Contaask table!');
    });


module.exports = Contask;