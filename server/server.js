var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var morgan = require('morgan')
var multer = require('multer');
var upload = require('./config/multer')(multer);

//var db = require('./db/db.js')
require('./db/schema.js')();

require('./config/passport.js')(passport)

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + '/../client'));
app.use(morgan('dev'));
// app.use session has to be above passport.use
app.use (session({
  secret: 'hello',
  resave: false,
  saveUninitialized: false
}))
 app.use(passport.initialize());
 app.use(passport.session());


// Writes all the routes to the server instance in the routes.js file
require('./routes.js')(app, passport, upload);

// Maps event listeners to io
require('./ioHandler.js')(io);

http.listen(3000, function(){
  console.log('listening on port 3000');
})
