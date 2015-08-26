angular.module('shareAustinHome', [])
.controller ('HomeCtrl', ['$scope', '$state', 'Item', '$location', function ($scope, $state, Item, $location) {
  $scope.search = ""
  $scope.sendSearch = function (term) {
    // Sends search data to all-listings, and gos to that path
    console.log("Item:", Item)
    Item.search.term = term
    console.log("Item search term: ", Item.search.term)
    console.log($location);
    $location.path('/all-listings');
  }
}])
