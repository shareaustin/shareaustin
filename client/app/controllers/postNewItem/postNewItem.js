angular.module('shareAustin')

// Controller for posting a new item
.controller('PostNewItemCtrl', function ($scope, $location, Auth, Item, Request, Helpers) {
  // Initialize the new Listing
  $scope.newListing = {};
  Auth.getUser().then(function(user){
    $scope.user = user;
  })

  // Post user input as new listing in database
  $scope.submitNewListing = function(item) {
    
    // Changes the user inputted address to a url end-path
    var address = Helpers.urlifyAddress(item.address);
    
    // Request to google maps api for location info 
    Request.items.getLocation(address)
      .then(function (googleResponse) {
        
        // Extracts useful info from google response
        var locationInfo = Helpers.simplifyLocation(googleResponse)
        console.log(locationInfo)

        // Sets properties of the listing not attained from form input  
        item.seller_id = $scope.user.id;
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
})
// Controller for adding photos to the item
.controller('ItemPrimaryPhotoCtrl', function ($scope, $location, Item, Request, sweet){
  
  // Getter/setter returns boolean
  $scope.photoStatus = function() {
    return Item.getPhotoStatus();
  };

  // Gets the item we are adding pics to
  $scope.item = Item.get();

  // Executes when drag and drop or select a photo to be uplaoded
  $scope.$watch('files', function(){
    $scope.uploadPhoto($scope.files, $scope.item);
  })

  // User can only click submit is this status is true
  // Used to prevent changing location during upload
  Item.setPhotoStatus(true);
  console.log("Item.getPhotoStatus() ", Item.getPhotoStatus());
  console.log($scope.photoStatus());

  // Uploads an array of files, set photoStatus to false
  $scope.uploadPhoto = function(files, item){
    if (files && files.length){
      Item.setPhotoStatus(false);
      files.forEach(Item.uploadPhoto.bind(null, item.id));
    }
  }
  // Brings user to dashboard (unless upload in process)
  $scope.update = function(){
    if (Item.getPhotoStatus() === true) {
      // Updates appropriate item and changes path to dashboard
      Request.items.editItem(Item.get())
      $location.path('/dashboard');
    } else {
      console.log("Item photo not yet uploaded.");
    }
   }
});
