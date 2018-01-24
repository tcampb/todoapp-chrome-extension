const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const parseJSON = bodyParser.json();
const parseURL = bodyParser.urlencoded( {extended: false} );
const isAuthorized = require('./auth');
const cookieSession = require('cookie-session');
const config = require('./config/config');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const hbs = require('hbs');
const helperFunctions = require('./helperFunctions');
//Import routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const dashboard = require('./routes/dashboard');
const profile = require('./routes/profile');
const task = require('./routes/task');
const contact = require('./routes/contacts');
const integrations = require('./routes/integrations');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

////////////////////
app.use(cookieParser());
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [config.session.cookieKey]
}));
//Initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
//Parse JSON / url-encoded req
app.use(parseJSON);
app.use(parseURL);
//Homepage route
//Check to see if the user is currently signed-in
app.use(isAuthorized);
//Routes to homepage, login, sign-up
//Redirect user to dashboard if they are currently signed in
app.use('/', index);
//Routes Google & email/password authentication
app.use('/auth', auth);
//Dashboard will only display if authenication is successful
app.use('/dashboard', dashboard);
app.use('/profile', profile);
app.use('/task', task);
app.use('/contacts', contact);
app.use('/integrations', integrations);
//Logout user and redirect to sign-in page
app.get('/logout', function(req, res){
  res.cookie('session', '');
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
