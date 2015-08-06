var db = require('../db/db.js');
module.exports = db.Model.extend({
	tableName: 'transactions'
});