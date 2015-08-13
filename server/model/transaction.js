var bookshelf = require('../db/db.js');
 
var Transaction = bookshelf.Model.extend({
  tableName: 'transactions',

  item: function(){
   return this.belongsTo('Item');
  },

  rating: function(){
  	return this.hasOne('Rating');
  },
});

module.exports = bookshelf.model('Transaction', Transaction);