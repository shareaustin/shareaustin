var bookshelf = require('../db/db.js');
var Chat= bookshelf.Model.extend({
	tableName: 'chats'
});

module.exports = bookshelf.model('Chat', Chat);