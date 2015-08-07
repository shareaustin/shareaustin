var config = require('../../knexfile.js');
var env = process.env.NODE_ENV || 'development';
var knex = require('knex')(config[env]);
var bcrypt = require('bcrypt-nodejs');


var passportConfig = {}

passportConfig.strategy = function(username, password, done) {
  console.log(username, password);
  var hash = "";

  knex('users').where({
    name: username
  })
  .select('id', 'password')
  .then(function(rows, err) {
    hash = rows[0].password
    bcrypt.compare(password, hash, function(err, hash) {
      if (!err) {
        knex('users').where({
           name: username
        })
        .select('id', 'name')
        .then(function(userRows) {
          var user = userRows[0];
          return done(null, user)
        })
      }
    })
  })
  .catch(function(err) {
    console.log(err);
    res.json({
      "message": "Invalid username/password"
    });
  })
}


module.exports = passportConfig
