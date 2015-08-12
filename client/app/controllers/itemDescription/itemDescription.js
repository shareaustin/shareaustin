angular.module('shareAustin')
.controller('ItemDescriptionCtrl', function ($scope, $location, Item) {
  $scope.item = Item.get()
  $scope.rentRedirect = function () {
    $location.path('/transaction')
  }
})
