var db = require('../db/db.js');
var Item = require('./item.js')
var Transaction = require('./transaction.js');
var Rating = require('./rating.js');
	//seller history
	//select * from items i join transactions t on i.id=t.item_id join users u on u.id=i.seller_id;

	//buyer history
	//select * from transactions t join users u on t.buyer_id=u.id;
module.exports = db.Model.extend({
	tableName: 'users',
	items: function (){
		return this.hasMany(Item, ['seller_id'])
	},

	soldTransactions: function(){
		return this.hasMany(Transaction, ['seller_id'])
		.through(Item)
	},

	boughtTransactions: function(){
		return this.hasMany(Transaction, ['buyer_id'])
	},

	buyerRatings: function(){
		return this.hasMany(Rating, ['buyer_id'])
		.through(Transaction)
	},

	sellerRatings: function (){
		return db.knex.select('u.first_name', 'i.name', 't.id', 'r.seller_rating')
		.from('users as u')
		.innerJoin('items as i', 'u.id', 'i.seller_id')
		.innerJoin('transactions as t', 't.item_id', 'i.id')
		.innerJoin('ratings as r', 'r.transaction_id', 't.id')
	},

});