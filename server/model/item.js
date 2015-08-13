var bookshelf = require('../db/db.js');
var Item = bookshelf.Model.extend({
	tableName: 'items',

	seller: function(){
		return this.belongsTo('User', 'seller_id');
	},

	transactions: function(){
		return this.hasMany('Transaction');
	},

	favorites: function(){
		return this.hasMany('Favorite');
	}
});

module.exports = bookshelf.model('Item', Item);

