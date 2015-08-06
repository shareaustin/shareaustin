var db = require('../db/db.js');
module.exports = db.Model.extend({
	tableName: 'users'
	//seller history
	//select * from items i join transactions t on i.id=t.item_id join users u on u.id=i.seller_id;

	//buyer history
	//select * from transactions t join users u on t.buyer_id=u.id;
});