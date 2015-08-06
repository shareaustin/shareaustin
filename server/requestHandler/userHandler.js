var User = require('../model/user.js');
module.exports = {
	getUser: function (req, res) {
		new User({'id': '1'}).fetch()
		.then(function (model) {
		  res.json(model);
		})
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
};