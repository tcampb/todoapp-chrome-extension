const Sequelize = require('sequelize'),
sequelize = require('../db'),
User = require('./user');

const Contact = sequelize.define('contact',{

    firstName: {
        type: Sequelize.STRING, allowNull:false,
        validate:{notEmpty:{args:true,msg:`virtual friend with no first name is not allowed`}}
    },

    lastName: {
        type: Sequelize.STRING, allowNull:false
    },

    email : {
        type: Sequelize.STRING,allowNull:false,
        validate: {isEmail:true,msg:`Please enter a valid email` }
    },

    recent_date:{
        type: Sequelize.DATE, defaultValue: Sequelize.NOW 
    }

});

Contact.belongsTo(User);


module.exports = Contact;