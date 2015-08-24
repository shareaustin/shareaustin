var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/user.js');
var bcrypt = require('bcrypt');

module.exports = function(passport){
	passport.serializeUser(function(user,done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		new User({'id': id}).fetch()
		.then(function (model){
			model ? done(null, model) : done(new Error('user doesnt exist'))
		})
		
	});

	passport.use('signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, 
	function(req, email, password, done){
		process.nextTick(function(){
			console.log('**** PASSPORT AUTH USER PROPERTIES **** : ', req.body);
			new User({'email': email}).fetch()
			.then(function(user){
				if (user){
					//user already exists
					console.log('user already exisits!!')
					return done(new Error('account exists for email'));
				} else {
          bcrypt.hash(password, 10, function(err, hash){
            new User({
						  'email': email,
						  'password': hash,
						  'first_name': req.body.first_name,
						  'last_name': req.body.last_name
					  }).save().then(function(user){
					  	return done(null, user);
					  });
          });
				}
		  });
		});
	}));

	passport.use('signin', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, 
	function(req, email, password, done){
		process.nextTick(function(){
			console.log("inside process.nextTick");
			new User({'email': email}).fetch()
			.then(function(user){
				console.log("signin user fetch request: ", user);
				if(!user){
					return done(new Error("user doesn't exist"))
				} else {
          bcrypt.compare(password, user.attributes.password, function(err, match){
            if(!match) return done(new Error('Incorrect Password'))
					  return done(null, user)
          })
				} 
			})
			.catch(function(err) {
				console.log("error in signin fetch request: ", err);
			});
		});
	}));


};
