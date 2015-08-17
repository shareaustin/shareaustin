angular.module('shareAustin')

.controller('Feedback', function ($scope, SaveTransaction, Item) {
  
  // A lot of functions for a few stars... may have overcomplicated this

  // Initialize rating at zero
  $scope.transaction = SaveTransaction;
  $scope.transaction.rating = 0;
  $scope.transaction.review = "";

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
    $scope.transaction.rating = 0;
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
      if (i > $scope.transaction.rating) {
        turnOff(i)
      } 
    }
  }
  // Turns on the stars up to the one that is hovered over
  function starsExpand (num) {
    for (var i = 1; i<=5; i++) {
      if (!$scope.transaction.rating) {
        i <= num ? turnOn(i) : turnOff(i);
      }
    }
  }

  // Upon click, sets transaction.rating, making appropriate stars expand and fade
  function clickStar(num) {
    if ($scope.transaction.rating) {
      restart();
      starsExpand(num);
      $scope.transaction.rating = num
    }
    else { 
      $scope.transaction.rating = num 
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
})


