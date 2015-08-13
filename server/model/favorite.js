var db = require('../db/db.js')
var Item = require('./item.js')

module.exports = db.Model.extend({
  tableName: 'favorites',
  item: function() {
    return this.belongsTo(Item)
  }
})
