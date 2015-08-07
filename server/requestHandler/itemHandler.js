var Item = require('../model/item.js');
module.exports = {
	getAvailableItems: function(req, res) {
		Item.where({'available': 'true'}).fetchAll()
		.then(function (model) {
			res.json(model)
		})
	},
	addItem : function(req, res) {
		var item = req.body;
		console.log(item);
		var attr = {
			'seller_id'     : item.seller_id,
			'name'          : item.name,
			'description'   : item.description,
			'available'     : item.available,
			'price_per_hour': item.price_per_hour,
			'price_per_day' : item.price_per_day
		}
		new Item(attr).save()
		.then(res.json("Item added!")) 
	},


}
