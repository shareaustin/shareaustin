var Item = require('../model/item.js');
module.exports = {
	getAvailableItems: function(req, res) {
		new Item({ 'available' : 'false'}).fetchAll()
		

		.then(function (model) {
			res.json(model)
		})
	},
	addItem : function(req, res) {
		var item = req.body
		new Item({'seller_id'     : item.seller_id,
						 'name'          : item.name,
						 'description'   : item.description,
						 'available'     : item.available,
						 'price_per_hour': item.price_per_hour,
						 'price_per_day' : item.price_per_day
					} ).save()
		.then( res.json("Item added!") ) 
	},


}
