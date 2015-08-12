angular.module('shareAustin')

.controller('PostNewItemCtrl', function ($scope, $location, Auth, Item, Request, Helpers) {
  $scope.newListing = {};

  $scope.submitNewListing = function(item) {
    // Changes the user inputted address to a url end-path
    var address = Helpers.urlifyAddress(item.address);

    // Request to google maps api for location info 
    Request.items.getLocation(address)
      .then(function (googleResponse) {

        // Extracts useful info from google response
        var locationInfo = Helpers.simplifyLocation(googleResponse)
        console.log(locationInfo)

        // Sets properties not found from form input  
        item.seller_id = Auth.getUser() ? Auth.getUser().id : 1;
        item.lat       = locationInfo.lat;
        item.lng       = locationInfo.lng;
        item.address   = locationInfo.address;
        item.active    = true;
        item.available = true;

        // Add new item to database
        Request.items.submitNewListing(item)
        .then(function (item){
          Item.set(item);
          $location.path('/item-primary-photo')
          
        })


        // Clear input fields once submitted
        $scope.item = {};
    })
  };

  $scope.addPhoto = function() {
    console.log('hey!!')
  };
})
.controller('ItemPrimaryPhotoCtrl', function ($scope, $location, Item, Request){
  $scope.item = Item.get();
  $scope.$watch('files', function(){
    $scope.uploadPhoto($scope.files, $scope.item);
  })

  $scope.uploadPhoto = function(files, item){
    if (files && files.length){
      files.forEach(Item.uploadPhoto.bind(null, item.id));
      //Request.items.editItem(Item.get())
    }
    //$scope.primaryPhotoUrl = Item.getPrimaryPhotoUrl();
    //console.log(Item.get());
  }

   $scope.update = function(){
     Request.items.editItem(Item.get())
     $location.path('/dashboard')
   }
});