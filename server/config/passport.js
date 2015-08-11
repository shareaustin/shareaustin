var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/user.js');

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
			new User({'email': email}).fetch()
			.then(function(user){
				if (user){
					//user already exists
					console.log('user already exisits!!')
					return done(new Error('account exists for email'));
				} else {
					new User({
						'email': email,
						'password': password,
					}).save().then(function(user){
						return done(null, user);
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
			console.log('Inside sign in')
			console.log('req.body ', req.body)
			console.log('email ', email)
			console.log('password', password)
			new User({'email': email}).fetch()
			.then(function(user){
				if(!user){
					return done(new Error("user doesn't exist"))
				} else if ( user.attributes.password !== password){
					return done(new Error('incorrect password'))
				} else{
					return done(null, user)
				}
			});
		});
	}));


};
