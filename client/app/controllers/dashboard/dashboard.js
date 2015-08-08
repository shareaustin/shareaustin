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

  $scope.fetchUser();
  $scope.fetchSellerRating();
})

.controller('YourTaskCtrl', function ($scope) {
  $scope.test = "howdy"
})
.controller('CurrentListingCtrl', function ($scope) {
  $scope.test = "your listing"
})
