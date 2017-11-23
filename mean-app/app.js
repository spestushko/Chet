/**
* Dependencies
*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

/**
* Include routes
*/
var chat = require('./routes/chat');

/**
* Create express app
*/
var app = express();

/**
* Express app config
*/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

/**
* Expose routes
*/
app.use('/chat', chat);

/**
* Catch 404 -> Forward to err handler
*/
app.use(function(req, res, next) {
  var err = new Error('404 not found');
  err.status = 404;
  next(err);
});

/**
* Error handler
*/
app.use(function(err, req, res, next) {
  // Return error back only in dev
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render error page
  res.status(err.status || 500);
  res.render('error');
});

/**
* Export app module
*/
module.exports = app;
