const Sequelize = require('sequelize'),
sequelize = require('../db'),
User = require('./user');

const Contact = sequelize.define('contact',{

    firstName: {
        type: Sequelize.STRING, notNull: true
    },

    lastName: {
        type: Sequelize.STRING, notNull: true
    },

    email : {
        type: Sequelize.STRING,
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