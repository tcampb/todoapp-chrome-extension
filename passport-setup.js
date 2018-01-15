const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require('./config');
const userModel = require('./models/table/user');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    userModel.findById(id).then((user) => {
        done(null, user);
    })
});

module.exports = passport.use(new GoogleStrategy({
    clientID: config.clientIdGoogle,
    clientSecret: config.clientSecretGoogle,
    callbackURL: '/users/google/redirect' 
    }, (accessToken, refreshToken, profile, done) => {
        //Check if user already exists in our db
        userModel.findOne({
            where: {
                googleId: profile.id
            }
        })
        .then((currentUser) => {
            if (currentUser) {
                throw Error("User already exists");
            } else {
                let fullName = profile.displayName.split(' ');
                userModel.create({
                    firstName: fullName[0],
                    lastName: fullName[1],
                    email: config.testEmail,
                    googleId: profile.id
                })
        .then((newUser) => {
            done(null, newUser);
        })
    }
})
})
);

 