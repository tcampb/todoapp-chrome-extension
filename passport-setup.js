const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require('./config');
const userModel = require('./models/table/user');
const _ = require('lodash');

module.exports = passport.use(new GoogleStrategy({
    clientID: config.clientIdGoogle,
    clientSecret: config.clientSecretGoogle,
    callbackURL: '/users/google/redirect' 
    }, (accessToken, refreshToken, profile, done) => {
        let fullName = profile.displayName.split(' ');
        userModel.create({
            firstName: fullName[0],
            lastName: fullName[1],
            email: config.testEmail,
            googleId: profile.id
        })
        .then((newUser) => {
            console.log("New user created");
            res.send("Success");
        });
    })
    );

 