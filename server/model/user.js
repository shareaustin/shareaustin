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

	transactions: function(){
		return this.hasMany(Transaction, ['seller_id'])
		.through(Item)
	},

	buyerRatings: function(){
		return this.hasMany(Rating, ['buyer_id'])
		.through(Transaction)
	},

	sellerRatings: function (){
		// var queryString = 'select u.first_name, u.last_name, i.name, t.id, r.buyer_rating, r.seller_rating from users u join items i on i.seller_id=u.id join transactions t on t.item_id=i.id join ratings r on r.transaction_id  = t.id;'
		//  return this.hasMany(Rating)
		//  .through(Item)
		//  .through(Transaction)
		return db.knex.select('u.first_name', 'i.name', 't.id', 'r.seller_rating')
		//return db.knex.select('u.first_name', 'u.last_name', 'i.name')
		.from('users as u')
		.innerJoin('items as i', 'u.id', 'i.seller_id')
		.innerJoin('transactions as t', 't.item_id', 'i.id')
		.innerJoin('ratings as r', 'r.transaction_id', 't.id')
		  //.through(Transaction)
		//return this.transactions().

	},

});