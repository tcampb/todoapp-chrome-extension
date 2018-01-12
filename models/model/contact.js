const Sequelize = require('sequelize'),
sequelize = require('../db'),
User = require('./user');

const Contact = sequelize.define('contact',{

    firstName: {
        type: Sequelize.STRING, allowNull:false
    },

    lastName: {
        type: Sequelize.STRING, allowNull:false
    },

    email : {
        type: Sequelize.STRING,allowNull:false,
        validate: {isEmail:true }
    },

    recent_date:{
        type: Sequelize.DATE, defaultValue: Sequelize.NOW 
    }

});

Contact.belongsTo(User);

Contact.sync()
    .then(() => {
        console.log('Created Contact table!');
    });


module.exports = Contact;