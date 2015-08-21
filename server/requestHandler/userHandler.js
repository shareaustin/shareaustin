var User = require('../model/user.js');
var Transaction = require('../model/transaction.js');

module.exports = {

  isAuthorized: function(req, res) {
    var isAuthorized = req.user ? true : false;
    if (isAuthorized){
      new User({id: req.user.attributes.id}).fetch().then(function(user){
        res.json(user);
      })
    } else {
      res.json(undefined);    
    }
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
	getUserRatings : function (req, res) {
		var id = req.user ? req.user.attributes.id : 1
		new User().userRatings()
		.where({seller_id:id})
		.then(function (response) {
			console.log(response)
			var counter = 0
			var answer = response.reduce(function (sum, current) {
				if (current.seller_rating) {
					counter++
					return sum + current.seller_rating
				}
				else return sum
			}, 0)
			answer = (counter === 0 ?  0 : answer/counter)
			res.json(answer)
		})
	}
};
