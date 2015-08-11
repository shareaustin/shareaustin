angular.module('shareAustin')

.controller('TransactionCtrl', function($scope, $http, Request, sweet, Item) {
 
//TODO -- Populate transaction.buyer_id with user's logged-in id

//Formatting for date and time pickers
  $scope.rentalStartDate = new Date();
  $scope.rentalStartDate.setMinutes("0");
  $scope.rentalStartDate.setSeconds("0");
  $scope.rentalStartDate.setMilliseconds("0");
  $scope.rentalEndDate = new Date();
  $scope.rentalEndDate.setMinutes("0");
  $scope.rentalEndDate.setSeconds("0");
  $scope.rentalEndDate.setMilliseconds("0");

//Duration of rental sent to server to calculate price
  $scope.calculateDuration = function() {
    var startsAt = $scope.rentalStartDate.valueOf();
    // console.log('Transaction Starts At: ', startsAt);
    var endsAt = $scope.rentalEndDate.valueOf();
    // console.log('Transaction Ends At: ', endsAt);
    var totalHours = (endsAt - startsAt) / ( 60 * 60 * 1000 );
    console.log("Duration of rental: ", totalHours);
    return totalHours;
  }

//TEMPORARY -- Manually set the item info
  // $scope.item = {
  //   name: 'Kayak',
  //     photo_url: 'http://pics.woodenpropeller.com/kayak10.jpg',
  //     seller_username: 'kayakBob',
  //     available: 'true',
  //     description: 'This is a sweet kayak! Please rent it forever! Dog included!',
  //     price_per_hour: '10',
  //     price_per_day: '40',
  //     // total_price: this.price_per_hour * $scope.calculateDuration()
  // }

  $scope.item = Item.get();
  $scope.item.total_price = this.price_per_hour * $scope.calculateDuration();

  //Set price that is displayed
  $scope.rentalPrice = function() { return Math.floor($scope.item.price_per_hour * $scope.calculateDuration())};

  //Date format for database and price calculation
  $scope.dateFormatter = function (dateObj) {
    return dateObj.getFullYear() + "-" + (dateObj.getUTCMonth() + 1) + "-" + dateObj.getDate() + " " + dateObj.getHours() + ":" + dateObj.getMinutes();
  }

//TEMPORARY - dummy transaction data
  $scope.transaction = {
    item_id    : $scope.item.id,
    buyer_id   : '1',
    duration   : $scope.calculateDuration()
  }

//Save the transaction to the database
  $scope.saveTransaction = function(status, response) {
    $http.post('/api/addTransaction', { 
      stripe_token : response.id,
      item_id      : $scope.transaction.item_id,
      buyer_id     : $scope.transaction.buyer_id,
      start_date   : $scope.dateFormatter($scope.rentalStartDate),
      end_date     : $scope.dateFormatter($scope.rentalEndDate),
      duration     : $scope.calculateDuration()
    })
    .then(function(response) {
      sweet.show({
            title: "<small>Payment Confirmation</small>",
            text: '<p>You were charged:<br>$' + response.data.price + '.00</p>',
            type: 'success',
            html: true
        });
    });
  }

});