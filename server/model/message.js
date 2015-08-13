var bookshelf = require('../db/db.js');
var Message = bookshelf.Model.extend({
	tableName: 'messages',
});

module.exports = bookshelf.model('Message', Message);
