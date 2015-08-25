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
//  $scope.userId = Auth.getUser() ? Auth.getUser().id : 1;
  Auth.getUser().then(function(user){
    $scope.user = user;
  })
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

  $scope.stars = {
    1: { turnOn: false, turnOff: false},
    2: { turnOn: false, turnOff: false},
    3: { turnOn: false, turnOff: false},
    4: { turnOn: false, turnOff: false},
    5: { turnOn: false, turnOff: false}
  }

  $scope.dollers = {
    1: { turnOn: false, turnOff: false},
    2: { turnOn: false, turnOff: false},
    3: { turnOn: false, turnOff: false},
  }

  $scope.allOff = function() {
    for (var i = 1; i <= 5; i++ ) {
      $scope.stars[i].turnOn    = false;
      $scope.stars[i].turnOff   = false;
      if ( i<= 3 ) {
        $scope.dollers[i].turnOn  = false;
        $scope.dollers[i].turnOff = false;
      }
    }
  }

  $scope.starStyle = function(num) {
    for (var i = 1; i <= 5; i++) {
      if (i <= num) {
        $scope.stars[i].turnOn  = true;
        $scope.stars[i].turnOff = false;
      }
      else {
        $scope.stars[i].turnOn  = false;
        $scope.stars[i].turnOff = true;
      }
    }
  }

  $scope.prices = function(num) {
    for (var i = 1; i <= 3; i++) {
      if ( i <= num) {
        $scope.dollers[i].turnOn  = true;
        $scope.dollers[i].turnOff = false;
      }
      else {
        $scope.dollers[i].turnOn  = false;
        $scope.dollers[i].turnOff = true;
      }
    }
  }

  $scope.priceStyle = function(num) {
    for (var i = 1; i <= num; i++) {
      $scope.dollers[i].on  = true;
      $scope.dollers[i].off = false;
    }
  }
  
  $scope.clearFilters = function(){
    $scope.items = $scope.allItems;
  }

  $scope.filterPrice = function(num) {
    var limit = num === 1 ? 10 : num === 2 ? 20 : Infinity;
    $scope.items = [];
    for (var i = 0; i < $scope.allItems.length; i++) {
      if ($scope.allItems[i].price_per_day <= limit)
        $scope.items.push($scope.allItems[i])
    } 
  }

  $scope.filterStars = function(num) {
    $scope.items    = [];
    for (var i = 0; i < $scope.allItems.length; i ++) {
      if (Math.round($scope.allItems[i].seller.avgStars) >= num ) {
        $scope.items.push($scope.allItems[i])
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
        $scope.setupMap(); // function defined in mapSetup.js
        $scope.fetchFavoriteItems();
      })
  };

  // Fetch all favorite items associated with the user
  $scope.fetchFavoriteItems = function () {
     Request.favorites.fetchFavoriteItems($scope.user.id)
     .then(function (results){
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
    $scope.fav.user_id =  $scope.user.id;

    // Posts this favorite to database
    Request.favorites.addFavorite($scope.fav).then(function() {
      $scope.fetchFavoriteItems($scope.user.id);
    })
  }

  // Initially loads page
  $scope.loadPage()
})
