// Initialize application
var express = require('express')
var app = express();

// Set environments variables
const dotenv = require('dotenv');
dotenv.config();
var port = process.env.PORT || 8080;

// Set body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Set application routes
var routes = require('./api/routes');
routes(app);

// After connecting to DB - start the application
app.listen(port, function() {
  console.log('Server started on port: ' + port);
});