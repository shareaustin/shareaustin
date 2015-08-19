var bookshelf = require('../db/db.js');
var Chat= bookshelf.Model.extend({
	tableName: 'chats',
  //idAttribute: ['item_id', 'buyer_id'],
  
  item: function(){
    return this.belongsTo('Item')
  },

  messages: function(){
    return this.hasMany('Message');
  },

  buyer: function(){
    return this.belongsTo('User', 'buyer_id')      
  },

  seller: function(){
    return this.belongsTo('User', 'seller_id')
    .through('Item')  
  },
});

module.exports = bookshelf.model('Chat', Chat);
