var User = require('../model/user.js');
var Transaction = require('../model/transaction.js');

module.exports = {
	getUser: function (req, res) {
		var id = req.user ? req.user.attributes.id : 1
		new User({'id': id}).fetch()
		.then(function (model) {
		  res.json(model);
		})
	},

	getItems: function(req, res){
		console.log(Object.keys(req))
		var id = req.user ? req.user.attributes.id : 1
		new User({'id': id}).items().fetch()
		.then(function(items){
			res.json(items)
		})
	},

	getSoldTransactions: function(req, res){
		var id = req.user ? req.user.attributes.id : 1;
		new User({id:id}).related('soldTransactions').fetch({
			withRelated: [ 'item', 'rating']
		}).then(function(transactions){
			console.log('==============================');
			res.json(transactions)
		});
	},

	getBoughtTransactions: function(req, res){
		var id = req.user ? req.user.attributes.id : 1;
		new User({id:id}).related('boughtTransactions').fetch({
			withRelated: ['item', 'rating']
		}).then(function(transactions){
			res.json(transactions)
		});
	},

  getChats: function(req, res){
		var id = req.user ? req.user.attributes.id : 1
    var resp = {}
    new User({id:id}).buyerChats().fetch({
      withRelated: ['item', 'seller']
    })
    .then(function(bChats){
      resp.buyerChats = bChats;
      return new User({id:id}).sellerChats().fetch({
        withRelated: ['item', 'buyer']
      })
    }).then(function(sChats){
      resp.sellerChats = sChats;
      res.json(resp);
    })
  },
  
};
