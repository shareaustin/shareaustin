var bookshelf = require('../db/db.js');
var Chat= bookshelf.Model.extend({
	tableName: 'chats',
  //idAttribute: ['item_id', 'buyer_id'],
  
  messages: function(){
    return this.hasMany('Message');
  },
});

module.exports = bookshelf.model('Chat', Chat);
