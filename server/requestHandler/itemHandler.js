var Item = require('../model/item.js');
var ItemPhoto = require('../model/itemPhoto.js');
var cloudinary = require('cloudinary');
var fs = require('fs');
cloudinary.config({
	'cloud_name': 'drw6xrsdi',
	'api_key': '535674769165867',
	'api_secret': 'U7QPapkI4VzvwC0ict0dsC2PpD4'
})

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
			'active'				: item.active,
			'price_per_hour': item.price_per_hour,
			'price_per_day' : item.price_per_day,
			'address'				: item.address,
			'lat'						: item.lat,
			'lng'						: item.lng
		}
		new Item(attr).save()
		.then(res.json("Item added!")) 
	},
	editItem: function(req, res) {
		console.log("in edit item handler")
		new Item({
			id: 1
		}).save(req.body, {patch: true})
		.then(res.json("Item updated!"))
	},
	getItemById: function(req, res) {
		var itemId = req.body.itemId;
		console.log("itemId: "+ itemId +" type: "+ typeof itemId)
		Item.where({'id': itemId }).fetch()
		.then(function (model) {
			console.log("model" + model)
			res.json(model)
		})
	},

	getCurrentListings: function(req, res) {
		var id = req.user ? req.user.attributes.id : 1
		Item.where(
			{	'available': 'true',
				'seller_id': id	
			}).fetchAll()
		
		.then(function (model) {
			res.json(model)
		})
	},

	// deactivateItemById: function(req, res) {
	// 	var itemId = req.body.itemId;
	// 	new Item({ id : itemId}).destroy().
	// 	then(function () {
	// 		res.json("Deleted")
	// 	}) 
	// },

	linkPhoto: function(req, res){
		var path = __dirname + '/../uploads/' + req.file.originalname;
		cloudinary.uploader.upload(path, function(result){
			new ItemPhoto({
				'item_id': req.body.item_id,
				'url': result.secure_url,
			}).save().then(function(photo){
				fs.unlink(path, function (){
					console.log('removed ' + path)
				})
				res.json(photo)
			})
  		console.log(result);
  	})
	},

	getPhotos: function(req, res){
		var itemId = req.body.itemId;
		ItemPhoto.where({'item_id':itemId}).fetchAll()
		.then(function(model) {
			console.log("Item photos model: ", model);
			res.json(model);
		})
	}

}
