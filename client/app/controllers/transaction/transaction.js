angular.module('shareAustin')

.controller('TransactionCtrl', function($scope, $http, Request) {
  
  /* TODOS:
    1. Populate the view with item info
    2. Set the item id to $scope.transaction.item_id
    3. Grab (or let user set) the start date & end date (date/timepickers?)
    4. Display the price to the user (let them know how much they'll be charged)
    5. Display a confirmation message to user (or failure message) when
    Stripe sends back info.
  */ 

  $scope.calculateDuration = function() {
      var startsAt = new Date('2015-08-14 12:00:00').valueOf();
      // console.log('Transaction Starts At: ', startsAt);
      var endsAt = new Date('2015-08-15 13:00:00').valueOf();
      // console.log('Transaction Ends At: ', endsAt);
      var totalHours = (endsAt - startsAt) / ( 60 * 60 * 1000 );
      return totalHours;
  }

  $scope.transaction = {
    item_id    : '1',
    buyer_id   : '1',
    start_date : '2015-08-14 12:00:00',
    end_date   : '2015-08-15 13:00:00',
    duration   : $scope.calculateDuration()
  }

  $scope.saveTransaction = function(status, response) {
    $http.post('/api/addTransaction', { 
      stripe_token : response.id,
      item_id      : $scope.transaction.item_id,
      buyer_id     : $scope.transaction.buyer_id,
      start_date   : $scope.transaction.start_date,
      end_date     : $scope.transaction.end_date,
      duration     : $scope.transaction.duration
    });
    //Log the rental duration
    // console.log('Rental Duration on Client Side: ', $scope.transaction.duration);
  }

});