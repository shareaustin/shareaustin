angular.module('shareAustin')
.controller('ItemDescriptionCtrl', function ($scope, Item) {
  $scope.item = Item.get()
  $scope.rentRedirect = function () {}
})
