// Initialize application
var express = require('express')
var app = express();

// Set environments variables
const dotenv = require('dotenv');
dotenv.config();
var port = process.env.PORT || 3000;

// Set body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Set application routes
var routes = require('./api/routes');
routes(app);

// Configuring the database
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
console.log("Connecting to DB...");
mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
  
  // After connecting to DB - start the application
  app.listen(port, function() {
    console.log('Server started on port: ' + port);
  });
}).catch(err => {
  console.log('Could not connect to the database.', err);
  process.exit();
});