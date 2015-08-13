var bookshelf = require('../db/db.js')
var Favorite= bookshelf.Model.extend({
  tableName: 'favorites',
  idAttribute: ['user_id', 'item_id'],
  
  item: function() {
    return this.belongsTo('Item')
  }
})

module.exports = bookshelf.model('Favorite', Favorite);
