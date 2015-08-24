angular.module('shareAustin')

.controller('AvailableItemsCtrl', function($scope, $window, $location, $window, Request, Helpers, Item, Auth, $filter) {

  // Allows this controller to be expanded into mapSetup file
  angular.module('shareAustin').expandAvailableItems($scope, Request, Helpers, $filter)

  // Initialize containers for data
  $scope.currentItem = {};
  
  // $scope.items changes with filters, $scope.all items allways contains all the items
  $scope.items       = [];
  $scope.allItems    = [];
  
  $scope.fav         = {};
  $scope.search = Item.search.term
  $scope.userId = Auth.getUser() ? Auth.getUser().id : 1;
  
  // From items extracts average seller ratings
  $scope.avgRating = function (items) {
    items.forEach(function (item) {
      var total, len = 0;
      total = item.seller.soldTransactions.reduce(function (prev, stars, i, arr) {
        if (stars.rating.seller_rating) {
          len++;
         return prev + stars.rating.seller_rating
        }
        return prev
      },0)
      item.seller.avgStars = Math.ceil(total/len)
      if (isNaN(item.seller.avgStars)) item.seller.avgStars = 0
      if (item.seller.avgStars >= 0) {
        item.seller.starsArr = [false,false,false,false,false]
        for (var i = 0; i <= item.seller.avgStars-1; i++) {
          item.seller.starsArr[i] = true
        }
      }
    })
  }
  
  $scope.clearFilters = function(){
    $scope.items = $scope.allItems;
  }

  $scope.filterPrice = function(num) {
    var limit = num === 1 ? 10 : num === 2 ? 20 : Infinity;
    var temp = $scope.items;
    $scope.items = [];
    for (var i = 0; i <$temp.length; i++) {
      if ($scope.temp[i].price_per_day < limit)
        $scope.items.push($scope.temp[i])
    } 
  }

  $scope.filterStars = function(num) {

    var temp = $scope.items;
    $scope.items    = [];

    for (var i = 0; i < temp.length; i ++) {
      if (Math.round(temp[i].seller.avgStars) >= num ) {
        console.log("Hey!")
        $scope.items.push(temp[i])
      }
    }
  }

  // Fetches all available items for display; sets up map with these items;
  $scope.loadPage = function() {
    Request.items.fetchAvailableItems()
      .then(function (results){
        $scope.items    = results;
        $scope.allItems = results;
        $scope.avgRating($scope.items)
        console.log($scope.items)
        $scope.setupMap(); // function defined in mapSetup.js
        $scope.fetchFavoriteItems();
      })
  };

  // Fetch all favorite items associated with the user
  $scope.fetchFavoriteItems = function (userId) {
     Request.favorites.fetchFavoriteItems($scope.userId)
     .then(function (results){
      // console.log("at promise")
      // console.log($scope.items)
      // console.log(results)
     $scope.favorites = results;
     $scope.crossCheckFavs();
    })
  }

  // Looks in the items on the page, if they are also a favorited item
  // makes a favorited property equal true
  $scope.crossCheckFavs = function() {
  for (var i = 0; i < $scope.items.length; i++) {
    $scope.items[i].favorited = false;
      for (var j = 0 ; j < $scope.favorites.length; j++) {
       if ($scope.favorites[j].item_id===$scope.items[i].id) {
        // console.log("if worked")
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

  // Change any item to a have favorited style
  $scope.favoritedStyle = function(item) {
    item.favorited = true
  }

  // Occurs when user favorites an item, stores favorite in db
  $scope.newFavorite = function ($event) {

    $scope.class = "favorited"
    // Sets new favorite with item id, and userId
    $scope.fav.item_id =  $event.id;
    $scope.fav.user_id =  Auth.getUser() ? Auth.getUser().id : 1;

    // Posts this favorite to database
    Request.favorites.addFavorite($scope.fav).then(function() {
      $scope.fetchFavoriteItems($scope.userId);
    })
  }

  // Initially loads page
  $scope.loadPage()
})
