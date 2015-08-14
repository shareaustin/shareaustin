angular.module("shareAustin")

.controller("CalendarCtrl", function($scope) {
  $scope.day = moment();
  $scope.weeks = [1, 2, 3, 4];
  $scope.month = "August";
  $scope.daysOfMonth = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  $scope.previous = function(){
      console.log("Previous Month");
  }
  $scope.next = function(){
      console.log("Next Month");
  }
})

.directive("calendar", function() {
  return {
    restrict: "E",
    templateUrl: "app/directives/calendar/calendar.html",
    scope: {
        selected: "="
    },
  //calendar methods
  }
});