angular.module('shareAustin')

.controller('Feedback', function ($scope, $location, SaveTransaction, Item, Request, Auth) {
  
  // A lot of functions for a few stars... may have overcomplicated this

  // Initialize rating at zero
  $scope.userInput = {};
  $scope.transaction = SaveTransaction.get();
  Auth.getUser().then(function(user){
    $scope.user = user;
  })
  console.log("user"); console.log($scope.user)

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

// Fetches ratings, in case we are updating an existing rating
$scope.getRating = function() {
  Request.ratings.fetchRating($scope.transaction.id).then(function(response) {
  if (response.data === null) { 
    $scope.newRating = true;
  }
  else { 
    console.log("rating exists!")
    console.log(response.data)
    $scope.newRating = false;
  }

  })
}

// Fetches rating associated with this transaction
$scope.getRating($scope.transaction.id);

// Creates a new rating in database, unless there is already one
// associated with the transaction; if there already is on, 
// updates that rating in db
$scope.submitRatingAndReview = function() { 

  // This object is what will be sent to the db
  ratingAndReview = {}

  // Give it properties associated with transaction
  ratingAndReview.transaction_id = $scope.transaction.id;
  ratingAndReview.item_id        = $scope.transaction.item_id;

  // Transaction status also changes with rating submission. Initialized here.
  trsnUpdate = { id: $scope.transaction.id };

  // Evaluates to boolean - true if a buyer is submitting the rating, false if a seller is
  var buyerSubmission = ($scope.transaction.buyer_id === $scope.user.id)

  // Buyers write seller ratings and reviews, so update these field if buyer
  if (buyerSubmission) {
    ratingAndReview.seller_rating = $scope.userInput.rating;
    ratingAndReview.seller_review = $scope.userInput.review + "\n-" + $scope.user.first_name+" "+$scope.user.last_name; 
  }
  // Sellers write buyer ratings and reviews, so update these if seller
  else {
    ratingAndReview.buyer_rating  = $scope.userInput.rating;
    ratingAndReview.buyer_review  = $scope.userInput.review + "\n-" + $scope.user.first_name+" "+$scope.user.last_name;
  }
  // If there is no rating associated with this transaction, this is a new rating, so use addRating request
  if ($scope.newRating) {
    console.log("Brand new rating")
    Request.ratings.addRating(ratingAndReview);

    // if buyer submission, status changes status of transaction to "rating from seller pending"
    if (buyerSubmission) {
      trsnUpdate.status = 'rating from seller pending'
      Request.items.updateTransaction(trsnUpdate)
      $location.path("/dashboard") // go to dashboard
    }
    // if seller submission, change status to show a buyer rating is still needed
    else {
      trsnUpdate.status = 'rating from buyer pending'
      Request.items.updateTransaction(trsnUpdate)
      $location.path("/dashboard") // go to dahsboard
    }
  }
  // If not a new rating update the existing rating, and change transaction status to complete
  else {
    console.log("update Existing rating")
    trsnUpdate.status = "complete";
    Request.items.updateTransaction(trsnUpdate)
    Request.ratings.updateRating(ratingAndReview);
    $location.path("/dashboard")
  }
}

})


