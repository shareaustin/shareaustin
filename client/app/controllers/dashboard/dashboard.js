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

  $scope.fetchSoldTransactions = function() { 
     Request.user.fetchSoldTransactions()
     .then(function (results){
       $scope.soldTransactions = results;
       $scope.transactions = $scope.transactions.concat(results)
       console.log("inside trans controller", results)
     })
   }

  $scope.fetchBoughtTransactions = function() { 
     Request.user.fetchBoughtTransactions()
     .then(function (results){
       $scope.boughtTransactions = results;
       $scope.transactions = $scope.transactions.concat(results)
       console.log("inside trans controller", results)
       $scope.setStatusMessage();
     })
   }

  // Function does different things depending on status and if bought/sold
  $scope.statusFunctionality = function(trns) {
   if (trns.bought){
    console.log(trns)
      switch(trns.status) {
        case "started":
          // change path to message with buyer
          break;
        case "in-rent": 
          break; // go to details
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
    else {
      switch(trns.status) {
        case "started": 
          break; //msg buyer
        case "in-rent": 
          break; // go to details
        case "returned": 
          SaveTransaction.set(trns);
          $location.path("/feedback")
          break; // pop up rating form
        case "rating from seller pending":
          SaveTransaction.set(trns)
          $location.path("/feedback")
        case "overdue": 
          break; // go to message
        default: break;
      }
    }
  }

  $scope.setStatusMessage = function() {
    for (var i = 0; i < $scope.boughtTransactions.length; i++) {
      switch($scope.boughtTransactions[i].status) {
        case "started" :
          $scope.boughtTransactions[i].statusMessage = "Message Owner"; break;
        case "in-rent" :
          $scope.boughtTransactions[i].statusMessage = "Due Date: " + $scope.boughtTransactions[i].end_date.substr(0,10);      break; //+ dueData
        case "returned":
          $scope.boughtTransactions[i].statusMessage = "Rate Seller";    break;
        case "rating from buyer pending": 
          $scope.boughtTransactions[i].statusMessage = "Rate Seller";
        case "rating from seller pending": 
          $scope.boughtTransactions[i].statusMessage = "Complete";  
        case "complete":
          $scope.boughtTransactions[i].statusMessage = "Complete";       break;
        case "overdue" :
          $scope.boughtTransactions[i].statusMessage = "Overdue";       break;
        default: break;
      }
      $scope.boughtTransactions[i].bought = true;
    }
    for (var i = 0; i < $scope.soldTransactions.length; i++) {
      switch($scope.soldTransactions[i].status) {
        case "started" :
          $scope.soldTransactions[i].statusMessage = "Message Renter";    break;
        case "in-rent" :
          $scope.soldTransactions[i].statusMessage = "Return Date: " + $scope.soldTransactions[i].end_date.substr(0,10);;       break; //+ dueData
        case "returned":
          $scope.soldTransactions[i].statusMessage = "Rate Renter";        break;
        case "rating from seller pending":
          $scope.soldTransactions[i].statusMessage = "Rate Renter";       break;
        case "rating from buyer pending":
          $scope.soldTransactions[i].statusMessage = "Complete";          break;
        case "complete":
          $scope.soldTransactions[i].statusMessage = "Complete";           break;
        case "overdue" :
          $scope.soldTransactions[i].statusMessage = "Overdue (Report User)"; break;
        default: break;
      }
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
