angular.module('shareAustin')

.controller('DashboardCtrl', function ($scope, Request) {
  $scope.user = {
    first_name: 'Bert',
    last_name: 'Knee',
    username: 'bert_knee',
    photo_url: 'http://img2.wikia.nocookie.net/__cb20150221203401/villains/images/e/ec/Nice-old-lady-1-.jpg',
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

.controller('TransactionHistory', function ($scope) {
  $scope.transactions = [
    {transaction_name: "sale one"},
    {transaction_name: "sale two"},
  ]
})
.controller('CurrentListingCtrl', function ($scope) {
  $scope.listings = [
    {
      item_name: "Canoe",
      item_price: "$20"
    },
    {
      item_name: "Kayak",
      item_price: "$30"
    },
    {
      item_name: "Boat",
      item_price: "$30"
    }
  ]
})

.controller('FavoritesCtrl', function ($scope){
  $scope.favorites = [ 
    {
      favorite_name: 'Bob Saget Cutout'
    }
  ]

  // $scope.fetchFavorites = function () {
  //   Request.favorites.fetchFavorites();
  //   .then(function (results){
  //     $scope.favorites.id = results.id;

  //   })
  // }

})
