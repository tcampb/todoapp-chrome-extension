const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING, allowNull:false,
        validate:{
            notEmpty:{args:true,msg:`I know you have a first name, give it to me`}
        }
    },
    lastName: {
        type: Sequelize.STRING
    },

    phone:{
        type:Sequelize.BIGINT,
        validate:{
            len:{args:[11],msg:`please include area code!, currently only allow NA area code`}
        }
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {args:true, msg:`user already exist`},
        validate: {isEmail:{args:true, msg:`please enter a valid email address`}}
    },

    password: {
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:{args:true,msg:`Enter a password please`}
        }
    },

    picture: {
        type:Sequelize.STRING,
        allowNull:true
    },

    googleId: {
        type:Sequelize.STRING,
        allowNull:true
    },

    google_calendar_token:{
        type: Sequelize.STRING,
        allowNull:true
    },

    sf_token :{
        type: Sequelize.STRING,
        allowNull:true
    },

    sf_refresh_token:{
        type: Sequelize.STRING,
        allowNull:true
    },

    sf_instance:{
        type: Sequelize.STRING,
        allowNull:true
    },
    sf_userId:{
        type:Sequelize.STRING,
        allowNull:true
    }
  });


    
    module.exports = User;