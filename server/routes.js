var userHandler = require('./requestHandler/userHandler.js');
var itemHandler = require('./requestHandler/itemHandler.js');
var transactionHandler = require('./requestHandler/transactionHandler.js');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, func){
    func(null, __dirname + '/uploads')
  },

  filename: function(req, file, func){
    func(null, file.originalname)
  }
});

var upload = multer({storage: storage})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/')
}
module.exports = function (app, passport) {
  app.get('/api/availableItems', itemHandler.getAvailableItems);
  app.post('/api/getItemById', itemHandler.getItemById);
  //app.get('/api/isLoggedIn', userHandler.isLoggedIn)
  
  //app.get('/api/sellerReviews', userHandler.sellerReviews)
  //app.get('/api/sellerRatings', userHandler.sellerRatings)
  
  //app.get('/api/buyerReviews', userHandler.buyerReviews)
  //app.get('/api/buyerRatings', userHandler.buyerRatings)
  
  //app.get('/api/userTransactions', userHandler.userTransactions)
  //app.get('/api/userFavorites', userHandler.userFavorites)
  app.post('/api/addTransaction', transactionHandler.addTransaction);

  app.post('/api/addItem', itemHandler.addItem);
  app.post('/api/editItem', itemHandler.editItem);
  //app.post('/api/deactivateItemById', itemHandler.deactivateItemById)

  //app.post('/api/signIn', userHandler.signIn)
  //app.post('/api/signUp', userHandler.signUp)
  //app.post('/api/logout', userHandler.logout)

  //app.post('api/addReview', ratingsHandler.addReview)
  //app.post('api/removeReview', ratingsHandler.removeReview)

  //app.post('api/addFavorite'  , favoriteHandler.addFavorite)
  //app.post('api/removeFavorite', favoriteHandler.removeFavorite)

  //app.post('api/addRating'  , ratingHandler.addRating)

  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/api/user',
    failureRedirect: '/'
  })); 

  app.post('/signin', passport.authenticate('signin', {
    successRedirect: '/api/user',
    failureRedirect: '/'
  }));

  app.get('/api/user', isLoggedIn, userHandler.getUser);
  app.get('/api/user/items', userHandler.getItems);
  app.get('/api/user/soldTransactions', userHandler.getSoldTransactions);
  app.get('/api/user/boughtTransactions', userHandler.getBoughtTransactions);

  app.get('/api/user/buyer_ratings', userHandler.getBuyerRatings);
  app.get('/api/user/seller_ratings', userHandler.getSellerRatings);

  app.post('/api/user/item/photos/upload', upload.single('file'), itemHandler.linkPhoto);

  return app;
}

