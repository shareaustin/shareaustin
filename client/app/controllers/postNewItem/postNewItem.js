angular.module('shareAustin')

.controller('PostNewItemCtrl', function($scope, Request, Helpers) {
  $scope.newListing = {};

  $scope.submitNewListing = function(item) {
    var address = Helpers.urlifyAddress(item.streetAddress);
    Request.items.getLocation(address).then(function (googleResponse) {
      var locationInfo = Helpers.simplifyLocation(googleResponse)
      item.lat       = locationInfo.lat;
      item.lng       = locationInfo.lng;
      item.address   = locationInfo.address;
      item.active    = true;
      item.available = true;

      Request.items.submitNewListing(item);
      $scope.item = {};
    })
  };

  $scope.addPhoto = function() {
    console.log('hey!!')
  };
});