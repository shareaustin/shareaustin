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
			console.log('**** PASSPORT AUTH USER PROPERTIES **** : ', req.body);
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
						'first_name': req.body.first_name,
						'last_name': req.body.last_name
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
			console.log("inside process.nextTick");
			new User({'email': email}).fetch()
			.then(function(user){
				console.log("signin user fetch request: ", user);
				if(!user){
					return done(new Error("user doesn't exist"))
				} else if ( user.attributes.password !== password){
					return done(new Error('incorrect password'))
				} else{
					return done(null, user)
				}
			})
			.catch(function(err) {
				console.log("error in signin fetch request: ", err);
			});
		});
	}));


};
