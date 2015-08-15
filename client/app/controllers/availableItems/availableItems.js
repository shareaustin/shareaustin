angular.module('shareAustin')

.controller('AvailableItemsCtrl', function($scope, $window, $location, $window, Request, Helpers, Item, Auth) {
 
  // Allows this controller to be expanded into mapSetup file
  angular.module('shareAustin').expandAvailableItems($scope, Request, Helpers)  

  // Initialize containers for data
  $scope.currentItem = {};
  $scope.items       = [];
  $scope.fav         = {};
  //$scope.class       = "";

  // Fetches all available items for display; sets up map with these items; 
  $scope.loadPage = function() {
    Request.items.fetchAvailableItems()
      .then(function (results){
        $scope.items = results;
        $scope.setupMap(); // function defined in mapSetup.js
        $scope.fetchFavoriteItems();
      })
  };

  $scope.fetchFavoriteItems = function (userId) {
     Request.favorites.fetchFavoriteItems($scope.userId)
     .then(function (results){
      console.log("at promise")
      console.log($scope.items)
      console.log(results)
     $scope.favorites = results;
     $scope.crossCheckFavs();
    })
  }

  $scope.crossCheckFavs = function() {
  for (var i = 0; i < $scope.items.length; i++) {
      for (var j = 0 ; j < $scope.favorites.length; j++) {
       if ($scope.favorites[j].item_id===$scope.items[i].id) {
        console.log("if worked")
        $scope.items[i].favorited = true;
       } 
      } 
     }
  }


  // "Rent" button takes user to transaction view
  $scope.rentItem = function ($event) {
    console.log("Event ", $event)
    Item.set($event)
    $location.path('/transaction');
  }

  // Stores information to be used in detailed view, 
  // Then navigates to detailed view
  $scope.loadDetailedView = function ($event) {
    Item.set($event)
    $location.path('/item-description');
  }

  $scope.favoritedStyle = function(item) {
    item.favorited = true
  }

  // Occurs when user favorites an item
  $scope.newFavorite = function ($event) {

    $scope.class = "favorited"

    // Sets new favorite with item id, and userId
    $scope.fav.item_id =  $event.id;
    $scope.fav.user_id =  Auth.getUser() ? Auth.getUser().id : 1;

    // Posts this favorite to database
    Request.favorites.addFavorite($scope.fav).then(function() {
      $scope.fetchFavoriteItems();
    })
  }

  // Initially loads page
  $scope.loadPage()
})
