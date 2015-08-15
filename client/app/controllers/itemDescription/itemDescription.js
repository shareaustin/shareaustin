angular.module('shareAustin')
.controller('ItemDescriptionCtrl', function ($scope, $location, Item, Request, CalEvents) {
  $scope.item = Item.get();

  $scope.rentRedirect = function () {
    $location.path('/transaction')
  }
})