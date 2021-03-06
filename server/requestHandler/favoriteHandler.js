var Favorite = require('../model/favorite.js')
var Item     = require('../model/item.js')

module.exports = {
  addFavorite: function (req, res) {
    console.log('***ADD FAVORITE*** ', req.body)

    var attr = {
      'user_id' : req.body.user_id ? req.body.user_id : 4,
      'item_id' : req.body.item_id
    }
    new Favorite(attr).save()
    .then(res.json("Item Favorited"))
  },
  userFavoriteItems: function(req, res) {
    var userId = req.body.userId ? req.body.userId : 1
    Favorite.where({ user_id : userId}).fetchAll({
      withRelated: ['item']
    })
    .then(function(response) {
      res.json(response)   
    });
  },
  removeFavorite: function(req, res) {
    var userId = req.body.user_id;
    var itemId = req.body.item_id;

    Favorite.where({'user_id' : userId, 'item_id' : itemId})
    .destroy()
    .then(function(resp){
      console.log("testing this right now:"+resp)
      res.json(resp)
    })
  }
}
