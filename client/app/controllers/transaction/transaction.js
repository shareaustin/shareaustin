angular.module('shareAustin')

.controller('TransactionCtrl', function($scope, $http, Request, sweet, Item, Auth) {
 
//TODO -- Populate transaction.buyer_id with user's logged-in id

//Formatting for date and time pickers
  $scope.rentalStartDate = new Date();
  $scope.rentalStartDate.setHours($scope.rentalStartDate.getHours() + 1);
  $scope.rentalStartDate.setMinutes("0");
  $scope.rentalStartDate.setSeconds("0");
  $scope.rentalStartDate.setMilliseconds("0");
  $scope.rentalEndDate = '';


//Duration of rental sent to server to calculate price
  $scope.calculateDuration = function() {
    var startsAt = $scope.rentalStartDate.valueOf();
    // console.log('Transaction Starts At: ', startsAt);
    var endsAt = $scope.rentalEndDate.valueOf();
    // console.log('Transaction Ends At: ', endsAt);
    var totalDays = Math.round((endsAt - startsAt) / ( 60 * 60 * 1000 ) / 24);
    // console.log("Duration of rental: ", totalDays);
    if (totalDays === 0) {
      // if duration of rental is same day, charge for one day
      return 1;
    } else {
      return totalDays;
    }
  }

  $scope.item = Item.get();
  $scope.item.total_price = this.price_per_day * $scope.calculateDuration();

  //Set price that is displayed
  $scope.rentalPrice = function() { return Math.max(0, Math.floor($scope.item.price_per_day * $scope.calculateDuration()))};

  //Date format for database and price calculation
  $scope.dateFormatter = function (dateObj) {
    return dateObj.getFullYear() + "-" + (dateObj.getUTCMonth() + 1) + "-" + dateObj.getDate() + " " + dateObj.getHours() + ":" + dateObj.getMinutes();
  }

//Send logged-in user, selected item, and rental duration in request to server
  $scope.transaction = {
    item_id    : $scope.item.id,
    buyer_id   : Auth.getUser() ? Auth.getUser().id : 1,
    duration   : $scope.calculateDuration()
  }

//Save the transaction to the database
  $scope.saveTransaction = function(status, response) {
    //Check for valid rental duration
    var rentalDuration = $scope.calculateDuration();

    if (rentalDuration >= 1) {
      $http.post('/api/addTransaction', { 
        stripe_token : response.id,
        item_id      : $scope.transaction.item_id,
        buyer_id     : $scope.transaction.buyer_id,
        start_date   : $scope.dateFormatter($scope.rentalStartDate),
        end_date     : $scope.dateFormatter($scope.rentalEndDate),
        duration     : $scope.calculateDuration(),
        status       : 'started'
      })
      .then(function(response) {
        sweet.show({
              title: "<small>Payment Confirmation</small>",
              text: '<p>You were charged:<br>$' + response.data.price + '.00</p>',
              type: 'success',
              html: true
          });
      });
    } else {
      sweet.show({
        title: "<small>Error</small>",
              text: '<p>Please enter a rental duration of at least one day.</p>',
              type: 'error',
              html: true
      });
    }
  }

});