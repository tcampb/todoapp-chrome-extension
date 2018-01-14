const express = require('express');
var app = express();
const path = require('path');
const favicon = require('serve-favicon');
const index = require('./routes/index');
const users = require('./routes/users');
const dashboard = require('./routes/dashboard');
const userDB = require('./models/model/user')
const bodyParser = require('body-parser');
const parseJSON = bodyParser.json();
const parseURL = bodyParser.urlencoded( {extended: false} );
const isAuthorized = require('./auth');
const auth = require('./routes/auth');
var port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(parseJSON);
app.use(parseURL);

app.use('/', index);
app.use('/users', users);
//Dashboard will only display if authenication is successful
app.use('/dashboard', dashboard);
app.use(isAuthorized);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log(`Server running on port ${port}`);
});
