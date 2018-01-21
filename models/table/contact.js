const Sequelize = require('sequelize'),
sequelize = require('../db'),
User = require('./user');

const Contact = sequelize.define('contact',{

    firstName: {
        type: Sequelize.STRING, allowNull:false,
        validate:{notEmpty:true}
    },

    lastName: {
        type: Sequelize.STRING, allowNull:false
    },

    email : {
        type: Sequelize.STRING,allowNull:false,
        validate: {isEmail:{args:true,msg:`email is not valid`}}
    },

    recent_date:{
        type: Sequelize.DATE, defaultValue: Sequelize.NOW 
    }

});

Contact.belongsTo(User);


module.exports = Contact;