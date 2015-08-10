angular.module('shareAustin')

.controller('EditItemCtrl', function($scope, Request) {

  $scope.getItemById = function(itemId) {
    Request.items.itemById(itemId).then(function(item) {
      $scope.item = item;
    })
  },

  $scope.editItem = function(item) {
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

        // Updates item based on new values
        Request.items.editItem(item)
    })
  };
  // Hard coded for now to display item 1
  // Should display any selected item
  $scope.getItemById(1);
});