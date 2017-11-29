/**
* Dependencies
*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/**
* Establish database connection
*/
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/chet')
        .then (()    => console.log(`Connection to mongodb established`))
        .catch((err) => console.error(`Error occured: ${err}`));

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
 * Catch all the routes and give back the Angular app
 */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./dist/'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
  });
}

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
