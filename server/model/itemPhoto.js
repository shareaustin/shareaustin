var bookshelf = require('../db/db.js');

var ItemPhoto= bookshelf.Model.extend({
	tableName: 'item_photos',
  
});
module.exports = bookshelf.model('ItemPhoto', ItemPhoto);
