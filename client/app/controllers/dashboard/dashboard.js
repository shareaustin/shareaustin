angular.module('shareAustin')

.controller('DashboardCtrl', function ($scope, $location,  Auth, Request) {
  $scope.sellerRating;
  $scope.sellerStats = {}
  Auth.getUser().then(function(user){
    $scope.user = user;
  });

  $scope.fetchSellerRating = function() {
    Request.user.fetchSellerRating()
    .then(function (results){
      $scope.sellerRating = results
      console.log("fetchsellerrating", results)
      console.log("USER INFO ", $scope.user)
    })
  };
  $scope.fetchUserStats = function () {
    Request.user.fetchSoldTransactions()
    .then(function (results) {
      $scope.sellerStats.revenue = $scope.calculateRevenue(results)
      $scope.sellerStats.lended = results.length
      $scope.sellerStats.avgProfit = $scope.sellerStats.revenue / results.length
    })

    Request.user.fetchBoughtTransactions()
    .then(function (results) {
      $scope.sellerStats.borrowed = results.length
    })
  }
  $scope.calculateRevenue = function (array) {
    return array.reduce(function (sum, item) {
      days = item.duration / 24
      return sum + (item.price * days)
    },0)
  }
  $scope.deactivateItem = function(itemId) {
    var item = {id : itemId,  active : false }
    Request.items.editItem(item).then(
      function(results) {
        console.log(results)
      })
  }
  $scope.$watch('files', function(){
    $scope.uploadPhoto($scope.files)
  })

  $scope.uploadPhoto = function(files){
    if (files && files.length){
      files.forEach(Request.user.uploadPhoto);
    }
  };

  $scope.signout = function(){
    Auth.signout();
    $location.path('/');
  }
  
  $scope.fetchSellerRating()
  $scope.fetchUserStats()
})

.controller('TransactionHistory', function ($scope, Request, SaveTransaction, $location, Item, Chat) {

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
       $scope.transactions = $scope.transactions.concat($scope.boughtTransactions)
     })
   }


   $scope.chatRedirect = function(trns){

    var room = trns.item.id + "-" + $scope.user.id;
    Chat.setRoom(room);
    console.log('item description controller fetching user')
    console.log(room)
    Chat.joinOrCreate({
      item_id:  trns.item.id,
      buyer_id: trns.buyer_id
    })
    $location.path('/chatList');
  };

  // Provides different functionality for depending on the status of a transaction
  $scope.statusFunctionality = function(trns) {
   if (trns.bought){
      switch(trns.status) {
        case "started":
          console.log('user defined')
          console.log(trns.item)
          $scope.chatRedirect(trns);
          break;
        case "in-rent":
          break; // go to details??
        case "returned":
          SaveTransaction.set(trns);
          //$location.path("/feedback")
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
          $scope.chatRedirect(trns);
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
          //$location.path("/feedback")
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
  //$scope.userId = Auth.getUser() ? Auth.getUser().id : 1;
  Auth.getUser().then(function(user){
    $scope.user = user;
  })

  $scope.fetchFavoriteItems = function (userId) {
     Request.favorites.fetchFavoriteItems($scope.user.id)
     .then(function (results){
     $scope.favorites = results;
    })
   }

  $scope.removeFavoriteItems = function (favorite) {
    console.log("in remove favorites")
    console.log(favorite)
    Request.favorites.removeFavoriteItems(favorite)
    .then(function(results) {
      $scope.fetchFavoriteItems($scope.user.id)
    })

  }
  $scope.loadDetailedView = function ($event) {
    Item.set($event.item)
    $location.path('/item-description');
  }
  $scope.fetchFavoriteItems($scope.user.id);
  //$scope.removeFavoriteItems(favorite);
})
