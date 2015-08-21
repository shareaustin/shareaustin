var bookshelf = require('../db/db.js');
var User = bookshelf.Model.extend({
	tableName: 'users',

	items: function (){
		return this.hasMany('Item', 'seller_id')
	},

	soldTransactions: function(){
		return this.hasMany('Transaction', 'seller_id')
		.through('Item')
	},

	boughtTransactions: function(){
		return this.hasMany('Transaction', 'buyer_id')
	},

  buyerChats: function(){
    return this.hasMany('Chat', 'buyer_id');
  },

  sellerChats: function(){
    return this.hasMany('Chat', 'seller_id')
    .through('Item');
  },

	buyerRatings: function(){
		return this.hasMany('Rating', 'buyer_id')
		.through('Transaction')
	},

	// sellerRatings: function (){
	// 	return bookshelf.knex.select('u.first_name', 'i.name', 't.id', 'r.seller_rating')
	// 	.from('users as u')
	// 	.innerJoin('items as i', 'u.id', 'i.seller_id')
	// 	.innerJoin('transactions as t', 't.item_id', 'i.id')
	// 	.innerJoin('ratings as r', 'r.transaction_id', 't.id')
	// },
	userRatings: function () {
		return bookshelf.knex.select('r.seller_rating', 'u.first_name')
		.from('users as u')
		.innerJoin('items as i', 'u.id', 'i.seller_id')
		.innerJoin('transactions as t', 't.item_id', 'i.id')
		.innerJoin('ratings as r', 'r.transaction_id', 't.id')
	}

});

module.exports = bookshelf.model('User', User);
