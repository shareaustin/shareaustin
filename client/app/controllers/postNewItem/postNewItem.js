angular.module('shareAustin')

.controller('PostNewItemCtrl', function($scope, Request, Helpers) {
  $scope.newListing = {};

  $scope.submitNewListing = function(item) {
    // Changes user input address to url end-path
    var address = Helpers.urlifyAddress(item.streetAddress);

    // Request to google maps api for location info 
    Request.items.getLocation(address)
      .then(function (googleResponse) {

        // Extracts useful info from google response
        var locationInfo = Helpers.simplifyLocation(googleResponse)

        // Sets properties not found from form input  
        item.lat       = locationInfo.lat;
        item.lng       = locationInfo.lng;
        item.address   = locationInfo.address;
        item.active    = true;
        item.available = true;

        // Add new item to database
        Request.items.submitNewListing(item);

        // Clear input fields once submitted
        $scope.item = {};
    })
  };

  $scope.addPhoto = function() {
    console.log('hey!!')
  };
});