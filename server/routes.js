var userHandler = require('./requestHandler/userHandler.js');
var itemHandler = require('./requestHandler/itemHandler.js')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {
  app.get('/api/availableItems', itemHandler.getAvailableItems);
  app.post('/api/getItemById', itemHandler.getItemById);
  //app.get('/api/isLoggedIn', userHandler.isLoggedIn)

  //app.get('/api/sellerReviews', userHandler.sellerReviews)
  //app.get('/api/sellerRatings', userHandler.sellerRatings)

  //app.get('/api/buyerReviews', userHandler.buyerReviews)
  //app.get('/api/buyerRatings', userHandler.buyerRatings)

  //app.get('/api/userTransactions', userHandler.userTransactions)
  //app.get('/api/userFavorites', userHandler.userFavorites)


  app.post('/api/addItem', itemHandler.addItem);
  app.post('/api/editItem', itemHandler.editItem);
  //app.post('/api/removeItem', itemHandler.removeItem)

  app.post('/api/signIn', userHandler.signIn)
  app.post('/api/signUp', userHandler.signUp)
  //app.post('/api/logout', userHandler.logout)

  //app.post('api/addReview', ratingsHandler.addReview)
  //app.post('api/removeReview', ratingsHandler.removeReview)

  //app.post('api/addFavorite'  , favoriteHandler.addFavorite)
  //app.post('api/removeFavorite', favoriteHandler.removeFavorite)

  //app.post('api/addRating'  , ratingHandler.addRating)

  app.get('/api/user', userHandler.getUser);
  app.get('/api/user/items', userHandler.getItems);
  app.get('/api/user/transactions', userHandler.getTransactions);
  app.get('/api/user/buyer_ratings', userHandler.getBuyerRatings);
  app.get('/api/user/seller_ratings', userHandler.getSellerRatings);

  app.post('/api/user/item/photos/upload', itemHandler.linkPhoto);


  function checkLogin (req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.end('Please Login');
    }
  }

  return app;
}
