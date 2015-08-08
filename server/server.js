var express = require('express');
var routes = require('./routes.js');

var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./model/user.js')

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

app.use(passport.initialize());
app.use(passport.session());

//added
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());


app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client'));

// !! PROBLEM AREA !!
passport.use(new LocalStrategy(
  function(username, password, done) {
    new User({
      'username': username,
      'password': password
    }).fetch()
    .then(function (model) {
      console.log("Model ", model)
      return done(null, model);
    })
    .catch(function (err) {
      if (err) { return done(err); }
      if (!model) { return done(null, false); }
      if (!model.verifyPassword(password)) {
        return done(null, false);
      }
    })
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Not being used yet but would be passed in as a parameter on get post request
app.get('/checkAuth', function(req, res, next) {
  res.json(req.isAuthenticated());
})

// Writes all the routes to the server instance in the routes.js file

routes(app)
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port)
} )
