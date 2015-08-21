var bookshelf = require('../db/db.js');
var Message = bookshelf.Model.extend({
	tableName: 'messages',

  sender: function(){
    return this.belongsTo('User', 'sender_id');
  },
});

module.exports = bookshelf.model('Message', Message);
