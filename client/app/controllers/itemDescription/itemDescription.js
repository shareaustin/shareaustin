angular.module('shareAustin')
.controller('ItemDescriptionCtrl', function ($scope, $location, Item, Request, CalEvents) {
  $scope.item = Item.get();
  $scope.today = new Date();
  
  
  //Get item's transactions to show availability
  $scope.getEvents = function() {
    var events = [];
    var startDate;
    Request.items.fetchItemTransactions(Item.get().id, $scope.today)
    .then(function(data){
      $scope.itemTransactions = data;
      // console.log("$scope.itemTransactions: ", $scope.itemTransactions);
      for (var i = 0; i < $scope.itemTransactions.length; i++) {
        startDate = $scope.itemTransactions[i].start_date;
        startDate = new Date(startDate);
        // console.log("start date: ", startDate);
        events.push(startDate);
      }
    })
    .then(function() {
      // console.log("Calendar events: ", events);
      // console.log("First Event: ", events[0].date);
      CalEvents.set(events);
      // console.log("Stored in CalEvents factory: ", CalEvents.get());
      return CalEvents.get();
    });
  }

  $scope.rentRedirect = function () {
    $location.path('/transaction')
  }

  $scope.getEvents();
})