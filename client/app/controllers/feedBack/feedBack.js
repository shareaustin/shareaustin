angular.module('shareAustin')

.controller('Feedback', function ($scope, SaveTransaction, Item, Request, Auth) {
  
  // A lot of functions for a few stars... may have overcomplicated this

  // Initialize rating at zero
  $scope.userInput = {};
  $scope.transaction = SaveTransaction.get();
  $scope.user = Auth.getUser();

  $scope.userInput.rating = 0;
  $scope.userInput.review = "";

  // This object is use with ng-class to style the stars;
  // When turnOn is set to true, a turn-on css animation is activated;
  // When turnOff is set to true, the reverse css animation occurs
  $scope.ratingPicker =  { 
    1:  {turnOn: false, turnOff: false},
    2:  {turnOn: false, turnOff: false},
    3:  {turnOn: false, turnOff: false},
    4:  {turnOn: false, turnOff: false},
    5:  {turnOn: false, turnOff: false}
  }
  // Sets all classes to false
  function restart() {
    $scope.userInput.rating = 0;
    for (var i=1; i<=5; i++) {  
      $scope.ratingPicker[i].turnOn = false
      $scope.ratingPicker[i].turnOff = false 
    }
  }

  // Helper to turn stars on and off for styling
  function turnOn(i) {
    $scope.ratingPicker[i].turnOn  = true ;
    $scope.ratingPicker[i].turnOff = false;
  }
  function turnOff(i) {
    $scope.ratingPicker[i].turnOn  = false;
    $scope.ratingPicker[i].turnOff = true;
  }

  // Makes stars greater than the rating fade at mouseout
  $scope.starsFade = function() {
    for (var i = 1; i <= 5; i++) {
      if (i > $scope.userInput.rating) {
        turnOff(i)
      } 
    }
  }
  // Turns on the stars up to the one that is hovered over
  function starsExpand (num) {
    for (var i = 1; i<=5; i++) {
      if (!$scope.userInput.rating) {
        i <= num ? turnOn(i) : turnOff(i);
      }
    }
  }
  // Upon click, sets userInput.rating, making appropriate stars expand and fade
  function clickStar(num) {
    if ($scope.userInput.rating) {
      restart();
      starsExpand(num);
      $scope.userInput.rating = num
    }
    else { 
      $scope.userInput.rating = num 
    }
  }
  // Functions for each star being hovered over
  $scope.hoverOne   = function()  { starsExpand(1) }
  $scope.hoverTwo   = function()  { starsExpand(2) }
  $scope.hoverThree = function()  { starsExpand(3) }
  $scope.hoverFour  = function()  { starsExpand(4) }
  $scope.hoverFive  = function()  { starsExpand(5) }
  // Function for each star being clicked
  $scope.chooseOne   = function() { clickStar(1) }
  $scope.chooseTwo   = function() { clickStar(2) } 
  $scope.chooseThree = function() { clickStar(3) }
  $scope.chooseFour  = function() { clickStar(4) }
  $scope.chooseFive  = function() { clickStar(5) }



$scope.submitRatingAndReview = function() {
  var ratingAndReview = {};
  ratingAndReview.transaction_id = $scope.transaction.id;
  ratingAndReview.item_id        = $scope.transaction.item_id;

  if ($scope.transaction.buyer_id === $scope.user.id) {
    ratingAndReview.seller_rating = $scope.userInput.rating;
    ratingAndReview.seller_review = $scope.userInput.review;
  }
  else {
    ratingAndReview.buyer_rating  = $scope.userInput.rating;
    ratingAndReview.seller_rating = $scope.userInput.review;
  }

  Request.ratings.addRating(ratingAndReview);
}

})


