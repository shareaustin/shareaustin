var express = require('express');
var routes = require('./routes.js');

var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var db = require('./db/db.js')
require('./db/schema.js')();

// var passportConfig = require('./config/passport.js')(passport)

var app = express();

// app.use session has to be above passport.use
app.use (session({
  secret: 'hello',
  resave: false,
  saveUninitialized: false
}))

// app.use(passport.initialized());
// app.use(passport.session());

app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client'));

// Writes all the routes to the server instance in the routes.js file

routes(app)
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port)
} )
