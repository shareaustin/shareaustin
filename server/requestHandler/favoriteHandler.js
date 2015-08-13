var Favorite = require('../model/favorite.js')
var Item     = require('../model/item.js')

module.exports = {
  addFavorite: function (req, res) {
    console.log('***ADD FAVORITE*** ', req.body)

    var attr = {
      'user_id' : req.body.user_id,
      'item_id' : req.body.item_id
    }
    new Favorite(attr).save()
    .then(res.json("Item Favorited"))
  },
  userFavoriteItems: function(req,res) {
    userId = req.body.user ? req.body.user.attributes.id : 1
    Favorite.where({ user_id : userId}).fetchAll({
      withRelated: ['item']
    })
    .then(function(response) {
      console.log("!!!")
      console.log(response)
      res.json(response)   
    });
  }
}
