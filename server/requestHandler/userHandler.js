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
		if (User.where({'username': req.body.username}).fetchAll().length !== 1) {
			var attr = {
				'first_name': req.body.firstName,
				'last_name' : req.body.lastName,
				'username'  : req.body.userName,
				'email'	    : req.body.email,
				'password'  : req.body.password
			}

			new User(attr).save().then(res.redirect('/dashboard'))
		}
		res.redirect('/signIn')
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
