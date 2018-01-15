const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require('./config');
const userModel = require('./models/table/user')

module.exports = passport.use(new GoogleStrategy({
    clientID: config.clientIdGoogle,
    clientSecret: config.clientSecretGoogle,
    callbackURL: '/auth/google/redirect' 
    }, (accessToken, refreshToken, profile, done) => {
    console.log("test");
    })
    );
