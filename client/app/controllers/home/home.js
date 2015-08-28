angular.module('shareAustin')
.controller ('HomeCtrl', function ($scope, $location, Item, Auth) {
  $scope.search = ""
  $scope.sendSearch = function (term) {
    // Sends search data to all-listings, and gos to that path
    Item.search.term = term
    $location.path('/all-listings')
    console.log(Item.search.term)
  }
})
