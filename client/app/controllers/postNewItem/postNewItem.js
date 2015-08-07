angular.module('shareAustin')

.controller('PostNewItemCtrl', function($scope, Request) {
  $scope.newListing = {};

  $scope.submitNewListing = function(item) {
    item.available = true;
    Request.submitNewListing(item);
  };

  $scope.addPhoto = function() {
    console.log('hey!!')
  };
});