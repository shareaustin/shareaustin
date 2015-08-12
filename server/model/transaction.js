var db = require('../db/db.js');
var Item = require('./item.js')
var User = require('./user.js');
var Rating = require('./rating.js');
 
module.exports = db.Model.extend({
  tableName: 'transactions',
  items: function (){
    return this.belongsTo('Item', [item_name])
  }
});