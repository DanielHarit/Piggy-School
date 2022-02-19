var express = require('express')
var app = express();
const dotenv = require('dotenv');
dotenv.config();

var port = process.env.PORT || 3000;

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var routes = require('./api/routes');
routes(app);
app.listen(port, function() {
    console.log('Server started on port: ' + port);
});