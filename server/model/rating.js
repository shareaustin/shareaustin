var bookshelf = require('../db/db.js');
var Rating = bookshelf.Model.extend({
	tableName: 'ratings',
});

module.exports = bookshelf.model('Rating', Rating);