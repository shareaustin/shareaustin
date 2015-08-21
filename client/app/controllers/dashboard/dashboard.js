angular.module('shareAustin')

.controller('DashboardCtrl', function ($scope, Request) {
  // Hardcoded user
  $scope.user = {
    first_name: '',
    last_name: '',
    username: '',
    photo_url: 'http://res.cloudinary.com/drw6xrsdi/image/upload/c_scale,w_200/v1439385037/default_avatar_wvynf1.jpg',
    rating: '3',
  }

  $scope.fetchUser = function() {
    Request.user.fetchUser()
    .then(function (results){
      $scope.user.first_name = results.first_name;
      $scope.user.last_name = results.last_name;
      $scope.user.username = results.username;
      $scope.user.photo_url = results.photo_url;
    })
  }

  $scope.fetchSellerRating = function() {
    Request.user.fetchSellerRating()
    .then(function (results){
      var sellerTransactions = results;
      var ratingsSum = 0;
      for(var i = 0; i < sellerTransactions.length; i++) {
        ratingsSum += sellerTransactions[i].seller_rating;
      }
      var sellerRatingAvg = ratingsSum/sellerTransactions.length;
      $scope.user.rating = sellerRatingAvg;
    })
  }

  $scope.deactivateItem = function(itemId) {
    var item = {id : itemId,  active : false }
    Request.items.editItem(item).then(
      function(results) {
        console.log(results)
      })
  }

  $scope.fetchUser();
  $scope.fetchSellerRating();
  //$scope.deactivateItem(2);  // Hardcoded test on item 2
})

.controller('TransactionHistory', function ($scope, Request, SaveTransaction, $location) {
  
  $scope.transactions = [];

  // Fetches sold transactions, sets display properties, and concats them with $scope.transactions
  $scope.fetchSoldTransactions = function() {
     Request.user.fetchSoldTransactions()
      .then(function (results){
        $scope.soldTransactions = results;
        $scope.setSoldDisplay();
        $scope.transactions = $scope.transactions.concat(results)
      })
  }
  // Fetches bought transactions, sets display properties, and concats them with $scope.transactions
  $scope.fetchBoughtTransactions = function() {
     Request.user.fetchBoughtTransactions()
     .then(function (results){
       $scope.boughtTransactions = results;
       $scope.setBoughtDisplay();
       $scope.transactions = $scope.transactions.concat(results)
     })
   }

  // Provides different functionality for depending on the status of a transaction
  $scope.statusFunctionality = function(trns) {
   if (trns.bought){
      switch(trns.status) {
        case "started":
          // change path to message with buyer
          break;
        case "in-rent":
          break; // go to details??
        case "returned":
          SaveTransaction.set(trns);
          $location.path("/feedback")
          break;
        case "rating from buyer pending":
          SaveTransaction.set(trns)
          $location.path("/feedback")
          break;
        case "overdue" :
          break; // go to message
        default: break;
      }
    }
    // if sold transaction;
    else {
      switch(trns.status) {
        case "started":
          //msg buyer
          break; 
        case "in-rent":
          // go to details?
          break; 
        case "returned":
          // Go to feedback page with trns info
          SaveTransaction.set(trns);
          $location.path("/feedback")
          break; 
        case "rating from seller pending":
          // Go to feedbacj page with trns info
          SaveTransaction.set(trns)
          $location.path("/feedback")
          break;
        case "overdue":
          // go to message?
          break; 
        default: 
          break;
      }
    }
  }

  $scope.setBoughtDisplay = function() {
    // Inititialize reuse variables
    var display = ""
    var endDate = ""
    // Loop through bought transactions
    for (var i = 0; i < $scope.boughtTransactions.length; i++) {
      // Save end date
      endDate = $scope.boughtTransactions[i].end_date.substr(0,10)
      // Different display set depending on transaction status
      switch($scope.boughtTransactions[i].status) {
        case "started" :
          display = "Message Owner" ; 
          break;
        case "in-rent" :
          display = "Due Date: " + endDate  
          break;
        case "returned":
          display = "Rate Seller";    
          break;
        case "rating from buyer pending":
          display = "Rate Seller";
          break;
        case "overdue" :
          display = "Overdue";
          break;
        default: 
          display = "Complete"
          break;
      }
      // Set display as property
      // adding bought property helps differentiate between bought/sold items
      $scope.boughtTransactions[i].display = display;
      $scope.boughtTransactions[i].bought  = true;
    }
  }

  $scope.setSoldDisplay = function() {
    // Initialize reused variables
    var display = ""
    var endDate = ""
    // Loop thru sold transactions
    for (var i = 0; i < $scope.soldTransactions.length; i++) {
      // Set end date
      endDate = $scope.soldTransactions[i].end_date.substr(0,10)
      // Different displays depending on the status of the transaction
      switch($scope.soldTransactions[i].status) {
        case "started" :
          display = "Message Renter"    
          break;
        case "in-rent" :
          display = "Return Date: " + endDate;
          break; 
        case "returned":
          display = "Rate Renter"        
          break;
        case "rating from buyer pending":
          display = "Rate Renter"     
          break;
        case "overdue" :
          display = "Overdue (Report User)"
          break;
        default: 
          display= "Complete"
          break;
      }
      // Set the display variable as a property of a transaction
      // bought property used to differentiate between bought/sold transactions
      $scope.soldTransactions[i].display = display;
      $scope.soldTransactions[i].bought  = false;
      console.log("Testing display property:")
      console.log($scope.soldTransactions[i].display)
    }
  }

  $scope.fetchSoldTransactions();
  $scope.fetchBoughtTransactions();


})
.controller('CurrentListingCtrl', function ($scope, Item, Request, $location) {
  $scope.listings = [];
    Request.items.fetchCurrentListings()
    .then(function (results) {
      console.log(results)
      $scope.listings = results.data;
    })
  $scope.updateItem = function ($event) {
    console.log("Event ", $event)
    Item.set($event)
    $location.path('/edit-item');
  }
  $scope.removeItem = function($event) {
    console.log("Event ", $event)
    $event.active = false;
    Request.items.deactivateItem($event)
  }
})

.controller('FavoritesCtrl', function ($scope, Request, Auth, Item, $location){
  $scope.favorites = [] ;
  $scope.userId = Auth.getUser() ? Auth.getUser().id : 1;

  $scope.fetchFavoriteItems = function (userId) {
     Request.favorites.fetchFavoriteItems($scope.userId)
     .then(function (results){
     $scope.favorites = results;
    })
   }

  $scope.removeFavoriteItems = function (favorite) {
    console.log("in remove favorites")
    console.log(favorite)
    Request.favorites.removeFavoriteItems(favorite)
    .then(function(results) {
      $scope.fetchFavoriteItems($scope.userId)
    })

  }
  $scope.loadDetailedView = function ($event) {
    Item.set($event.item)
    $location.path('/item-description');
  }
  $scope.fetchFavoriteItems($scope.userId);
  //$scope.removeFavoriteItems(favorite);
})
