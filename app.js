var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var api_key = 'key-40b8728d78375e160853307036bca47e';
var domain = 'sandboxf47140bc2466456e899531deb2420b90.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/referral'
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, function(err) {
  console.log(err || `Connected to MongoDB: ${mongoUrl}`);
});

// mongoose.connect('mongodb://10.7.0.3:27107/data/db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
