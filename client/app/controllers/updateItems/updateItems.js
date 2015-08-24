angular.module('shareAustin')

.controller('EditItemCtrl', function ($scope, Helpers, Item, Request) {

  // Runs if files are changed
  $scope.$watch('files', function(){
    $scope.uploadPhoto($scope.files, $scope.item);
  });
  
  // Fetches an item based on id 
  $scope.getItemById = function(itemId) {
    Request.items.itemById(itemId).then(function(item) {
      console.log("getItembyId returns:")
      console.log(item)
      $scope.item = item;
    })
  },

  // Edits item in database
  $scope.editItem = function(item) {
    // Changes user input address to url end-path
    var address = Helpers.urlifyAddress(item.address);

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


  $scope.uploadPhoto = function(files, item){
    console.log('in upload photo. item is ', item)
    if (files && files.length){
      files.forEach(Item.uploadPhoto.bind(null, item.id));
    }
  }

  // Prepopulates form with selected items data
  $scope.getItemById(Item.get().id);
});
