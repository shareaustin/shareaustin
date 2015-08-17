var Item = require('../model/item.js');
var ItemPhoto = require('../model/itemPhoto.js');
var fs = require('fs');
var cloudinary = require('cloudinary');
require('../config/cloudinary')(cloudinary)


module.exports = {
	getAvailableItems: function(req, res) {
		Item.where({'available': 'true', 'active': 'true'}).fetchAll({
			withRelated: ['seller.soldTransactions.rating']
		})
		.then(function (model) {
			res.json(model)
		})
	},

	addItem : function(req, res) {
		var attr = req.body;
		new Item(attr).save()
		.then(function (item){
			res.json(item);
		}) 
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

	deactivateItemById: function(req, res) {
		new Item({id: req.body.id})
  	.save({active: 'false'}, {patch: true})
		.then(function (model) {
			res.json("Deleted item")
		}) 
	},

	linkPhoto: function(req, res){
		var path = __dirname + '/../uploads/' + req.file.originalname;
		cloudinary.uploader.upload(path, function(result){
			new ItemPhoto({
				'item_id': req.body.item_id,
				'photo_url': result.secure_url,
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
			// console.log("Item photos model: ", model);
			res.json(model);
		})
	},

	getSeller: function(req, res){
		var id = req.user ? req.user.attributes.id : 1;
		new Item({id:id}).fetch({
			withRelated: ['seller']
		}).then(function(item){
			res.json(item);
		})
	}

}
