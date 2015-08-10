angular.module('shareAustin')

.controller('PostNewItemCtrl', function($scope, Request, Helpers) {
  $scope.newListing = {};

  $scope.submitNewListing = function(item) {
    var address = Helpers.urlifyAddress(item.address);
  console.log(address)
    var coordinates = Request.items.getCoordinates(address)
    console.log("coordinates:" + coordinates)

    item.active    = true;
    item.available = true;
    
    Request.items.submitNewListing(item);
    $scope.item = {};
  };

  $scope.addPhoto = function() {
    console.log('hey!!')
  };
});