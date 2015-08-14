angular.module('shareAustin')

.controller('AvailableItemsCtrl', function($scope, $window, $location, $window, Request, Helpers, Item, Auth) {
  
  // Allows this controller to be expanded into mapSetup file
  angular.module('shareAustin').expandAvailableItems($scope, Request, Helpers)  

  // Initialize containers for data
  $scope.currentItem = {};
  $scope.items       = [];
  $scope.fav         = {};

  // Fetches all available items for display; sets up map with these items; 
  $scope.loadPage = function() {
    Request.items.fetchAvailableItems()
      .then(function (results){
        $scope.items = results;
        $scope.setupMap(); // function defined in mapSetup.js
      })
  };

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

  // Occurs when user favorites an item
  $scope.newFavorite = function ($event) {

    // Sets new favorite with item id, and userId
    $scope.fav.item_id =  $event.id;
    $scope.fav.user_id =  Auth.getUser().id;

    // Posts this favorite to database
    Request.favorites.addFavorite($scope.fav)
  }

  // Initially loads page
  $scope.loadPage()
})
