angular.module('shareAustin')

.controller('PostNewItemCtrl', function($scope, Request) {
  $scope.newListing = {};

  $scope.submitNewListing = function(item) {
    item.active    = true;
    item.available = true;
    
    Request.items.submitNewListing(item);
    $scope.item = {};
  };

  $scope.addPhoto = function() {
    console.log('hey!!')
  };
});