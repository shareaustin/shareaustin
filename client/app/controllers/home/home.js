angular.module('shareAustin')
.controller ('HomeCtrl', function ($scope, $location, Item) {
  $scope.search = ""
  $scope.sendSearch = function (term) {
    Item.search.term = term
    $location.path('/all-listings')
    console.log(Item.search.term)
  }
})
