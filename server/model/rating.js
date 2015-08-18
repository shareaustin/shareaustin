var bookshelf = require('../db/db.js');
var Rating = bookshelf.Model.extend({
	tableName: 'ratings',
  idAttribute: 'transaction_id'
});

module.exports = bookshelf.model('Rating', Rating);