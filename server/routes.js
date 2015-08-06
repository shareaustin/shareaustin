var userHandler = require('./requestHandler/userHandler.js');
var itemHandler = require('./requestHandler/itemHandler.js')

module.exports = function (app) {
  app.get('/api/users', userHandler.getUserDashboard);
  //app.get('/api/availableItems', itemHandler.getAvailableItems);
  //app.get('/api/isLoggedIn', userHandler.isLoggedIn)
  
  //app.get('/api/sellerReviews', userHandler.sellerReviews)
  //app.get('/api/sellerRatings', userHandler.sellerRatings)
  
  //app.get('/api/buyerReviews', userHandler.buyerReviews)
  //app.get('/api/buyerRatings', userHandler.buyerRatings)
  
  //app.get('/api/userTransactions', userHandler.userTransactions)
  //app.get('/api/userFavorites', userHandler.userFavorites)
   

  app.post('/api/addItem', itemHandler.addItem);
  //app.post('/api/editItem', itemHandler.editItem);
  //app.post('/api/removeItem', itemHandler.removeItem)

  //app.post('/api/signIn', userHandler.signIn)
  //app.post('/api/signUp', userHandler.signUp)
  //app.post('/api/logout', userHandler.logout)

  //app.post('api/addReview', ratingsHandler.addReview)
  //app.post('api/removeReview', ratingsHandler.removeReview)

  //app.post('api/addFavorite'  , favoriteHandler.addFavorite)
  //app.post('api/removeFavorite', favoriteHandler.removeFavorite)

  //app.post('api/addRating'  , ratingHandler.addRating)


  return app;
}

