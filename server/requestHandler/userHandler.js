var User = require('../model/user.js');
module.exports = {
	getUser: function (req, res) {
		new User({'id': '1'}).fetch()
		.then(function (model) {
		  res.json(model);
		})
	},

	// func to query the database and see if the user is in the database and if i not then add new user
	signUp: function (req, res) {
		console.log('auth inside userhandler ', req.isAuthenticated())
		console.log('inside userhandler ', req.body)
		if (User.where({'username': req.body.username}).fetchAll().length !== 1) {
			var attr = {
				'first_name': req.body.first_name,
				'last_name' : req.body.last_name,
				'username'  : req.body.username,
				'email'	    : req.body.email,
				'password'  : req.body.password
			}

			//hash attr.password here

			new User(attr).save().then(res.end("user created"))
		}
	},

		signIn: function (req, res) {
			// console.log('auth inside userhandler ', req.isAuthenticated())
			console.log('inside userhandler ', req.body)
			new User({
				'username': req.body.userName,
				'password': req.body.password
			}).fetch()
			.then(function (model) {
				if (model) {
			   	console.log (model.toJSON())
					res.end('true');
				} else {
					res.end('false');
				}
			}
			);
			// var userQuery = User.query({where: {'username': req.body.username}, andWhere: {'password': req.body.password}}).fetchAll();
	},

	getItems: function(req, res){
		new User({'id': '1'}).items().fetch()
		.then(function(items){
			res.json(items)
		})
	},

	getTransactions: function(req, res){
		new User({'id': '1'}).transactions().fetch()
		.then(function(transactions){
			res.json(transactions)
		})
	},

	getBuyerRatings: function(req, res){
		new User({'id': '2'}).buyerRatings().fetch()
	  .then(function(model){
	  	res.json(model)
	  })
	},

	getSellerRatings: function(req, res){
	  new User({'id': '1'}).sellerRatings()
	  .then(function(model){
	  	res.json(model)
	  })

	},
	getSellerReviews: function(req, res){
	  new User({'id': '1'}).sellerReviews()
	  .then(function(model){
	  	res.json(model)
	  })

	},
};
