angular.module('shareAustin')

.controller('DashboardCtrl', function ($scope, Request) {
  $scope.user = {
    first_name: '',
    last_name: '',
    username: '',
    photo_url: 'http://res.cloudinary.com/drw6xrsdi/image/upload/c_scale,w_200/v1439385037/default_avatar_wvynf1.jpg',
    rating: '3',
  }

  $scope.fetchUser = function() {
    Request.user.fetchUser()
    .then(function (results){
      $scope.user.first_name = results.first_name;
      $scope.user.last_name = results.last_name;
      $scope.user.username = results.username;
      $scope.user.photo_url = results.photo_url;
    })
  }

  $scope.fetchSellerRating = function() {
    Request.user.fetchSellerRating()
    .then(function (results){
      var sellerTransactions = results;
      var ratingsSum = 0;
      for(var i = 0; i < sellerTransactions.length; i++) {
        ratingsSum += sellerTransactions[i].seller_rating;
      }
      var sellerRatingAvg = ratingsSum/sellerTransactions.length;
      $scope.user.rating = sellerRatingAvg;
    })
  }

  $scope.deactivateItem = function(itemId) {

    var item = {
      id     : itemId,
      active : false
    }

    Request.items.editItem(item)
    .then(function(results) {
      console.log(results)
    })
  }

  $scope.fetchUser();
  $scope.fetchSellerRating();
  $scope.deactivateItem(2);
})

.controller('TransactionHistory', function ($scope, Request) {
  $scope.transactions = [];

  $scope.fetchSoldTransactions = function() { 
     Request.user.fetchSoldTransactions()
     .then(function (results){
       $scope.soldTransactions = results;
       $scope.transactions = $scope.transactions.concat(results)
       console.log("inside trans controller", results)
     })
   }

  $scope.fetchBoughtTransactions = function() { 
     Request.user.fetchBoughtTransactions()
     .then(function (results){
       $scope.boughtTransactions = results;
       $scope.transactions = $scope.transactions.concat(results)
       console.log("inside trans controller", results)
     })
   }
   $scope.fetchSoldTransactions();
   $scope.fetchBoughtTransactions();

})
.controller('CurrentListingCtrl', function ($scope, Item, Request, $location) {
  $scope.listings = [];
    Request.items.fetchCurrentListings()
    .then(function (results) {
      console.log(results)
      $scope.listings = results.data;
    })
  $scope.updateItem = function ($event) {
    console.log("Event ", $event)
    Item.set($event)
    $location.path('/edit-item');
  }
  $scope.removeItem = function($event) {
    console.log("Event ", $event)
    $event.active = false;
    Request.items.deactivateItem($event)
  }
})

.controller('FavoritesCtrl', function ($scope, Request, Auth){
  $scope.favorites = [] ;
  var userId = Auth.getUser() ? Auth.getUser().id : 1;
  console.log("checkout user:")
  console.log(userId)  
  $scope.fetchFavoriteItems = function (userId) {
     console.log("fav ctr "+userId)
     Request.favorites.fetchFavoriteItems(userId)
     .then(function (results){
      console.log("crucial Results "+results)
     $scope.favorites = results;
    })
   }
  $scope.fetchFavoriteItems(userId); 
})
