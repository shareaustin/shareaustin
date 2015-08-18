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
        console.log("expect this = 1: " + item.seller_id)
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
  $scope.photoStatus = function() {
    return Item.getPhotoStatus();
  };

  $scope.item = Item.get();
  $scope.$watch('files', function(){
    $scope.uploadPhoto($scope.files, $scope.item);
    // $scope.photoStatus();
  })

  Item.setPhotoStatus(true);
  console.log("Item.getPhotoStatus() ", Item.getPhotoStatus());
  console.log($scope.photoStatus());


  $scope.uploadPhoto = function(files, item){
    // $scope.photoStatus = true;
    if (files && files.length){
      Item.setPhotoStatus(false);
      files.forEach(Item.uploadPhoto.bind(null, item.id));
      //Request.items.editItem(Item.get())
    }
    //$scope.primaryPhotoUrl = Item.getPrimaryPhotoUrl();
    //console.log(Item.get());
  }

   $scope.update = function(){
    if (Item.getPhotoStatus() === true) {
     // $scope.photoStatus = false;
     // console.log("$scope.photoStatus: ", $scope.photoStatus);
     // console.log("Item photo uploaded. Redirecting to dashboard.");
     Request.items.editItem(Item.get())
     // .then(function(resp){
     //  console.log("Success response from cloudinary: ", resp.data);
     // })
     $location.path('/dashboard');
     Item.setPhotoStatus(false);
    } else {
      console.log("Item photo not yet uploaded.");
    }
   }
});