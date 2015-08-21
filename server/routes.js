var userHandler = require('./requestHandler/userHandler.js');
var itemHandler = require('./requestHandler/itemHandler.js');
var favoriteHandler = require('./requestHandler/favoriteHandler.js');
var transactionHandler = require('./requestHandler/transactionHandler.js');
var ratingHandler = require('./requestHandler/ratingHandler.js')
var chatHandler = require('./requestHandler/chatHandler.js');

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/')
}
module.exports = function (app, passport, upload) {
  app.get('/api/availableItems', itemHandler.getAvailableItems);
  app.post('/api/getItemById', itemHandler.getItemById);

  //app.get('/api/sellerReviews', userHandler.sellerReviews)
  //app.get('/api/sellerRatings', userHandler.sellerRatings)

  //app.get('/api/buyerReviews', userHandler.buyerReviews)
  //app.get('/api/buyerRatings', userHandler.buyerRatings)

  //app.get('/api/userTransactions', userHandler.userTransactions)
  app.post('/api/userFavoriteItems'  , favoriteHandler.userFavoriteItems)
  app.post('/api/addTransaction' , transactionHandler.addTransaction);
  app.post('/api/updateTransaction', transactionHandler.updateTransaction)
  app.post('/api/getItemTransactions/', transactionHandler.getItemTransactions);
  //app.post('/api/updateTransaction/', transactionHandler.updateTransaction)

  app.post('/api/addItem', itemHandler.addItem);
  app.post('/api/editItem', itemHandler.editItem);
  app.get('/api/currentListings', itemHandler.getCurrentListings)
  app.post('/api/deactivateItemById', itemHandler.deactivateItemById)

  //app.post('/api/logout', userHandler.logout)

  //app.post('api/addReview', ratingsHandler.addReview)
  //app.post('api/removeReview', ratingsHandler.removeReview)

  app.post('/api/addFavorite', favoriteHandler.addFavorite)
  app.post('/api/removeFavorite', favoriteHandler.removeFavorite)
  app.post('/api/addRating',ratingHandler.addRating)
  app.post('/api/updateRating', ratingHandler.updateRating)
  app.post('/api/fetchRating',ratingHandler.getRating)

  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/api/user',
    failureRedirect: '/'
  }));

  app.post('/signin', passport.authenticate('signin', {
    successRedirect: '/api/user',
    failureRedirect: '/'
  }));

  app.get('/auth', userHandler.isAuthorized);

  app.get('/api/user/items', userHandler.getItems);

  app.get('/api/user/chats', userHandler.getChats);

  app.get('/api/user/soldTransactions', userHandler.getSoldTransactions);
  app.get('/api/user/boughtTransactions', userHandler.getBoughtTransactions);
  app.get('/api/item/seller', itemHandler.getSeller);

  app.get('/api/user/chat/messages', chatHandler.getMessages);

  app.post('/api/user/item/photos/upload', upload.single('file'), itemHandler.linkPhoto);

  app.post('/api/getItemPhotos/', itemHandler.getPhotos);

  app.post('/api/chats/find-or-create', chatHandler.findOrCreate);
  return app;
}
