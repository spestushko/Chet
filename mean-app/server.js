// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

// Database connection string
const dbconnection = 'mongodb://admin:admin@ds035336.mlab.com:35333/chetdb';

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// JWT token configuration
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: "https://tokenweb.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:3000',
    issuer: "https://tokenweb.auth0.com/",
    algorithms: ['RS256']
});
// Whole application is using JWT token authentication
// app.use(jwtCheck);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
