angular.module("shareAustin")

.controller('CalendarCtrl', function ($scope, CalEvents, Item, Request) {
  $scope.day = moment();
  $scope.today = new Date();
  //Get item's transactions to show availability
  $scope.getEvents = function() {
    $scope.events = [];
    var itemId = Item.get().id;
    var eventDates;
    Request.items.fetchItemTransactions(itemId, $scope.today)
    .then(function(data){
      $scope.itemTransactions = data;
      // console.log("$scope.itemTransactions: ", $scope.itemTransactions);
      for (var i = 0; i < $scope.itemTransactions.length; i++) {
        eventDates = {startDate: moment($scope.itemTransactions[i].start_date), endDate: moment($scope.itemTransactions[i].end_date)};
        // console.log("start date: ", startDate);
        $scope.events.push(eventDates);
      }
    })
    .then(function() {
      // console.log("Calendar events: ", events);
      // console.log("First Event: ", events[0].date);
      CalEvents.set($scope.events);
      // console.log("Stored in CalEvents factory: ", CalEvents.get());
      // console.log("$scope.events: ", $scope.events);  
      return CalEvents.get();
    });
  }

  $scope.getEvents();
// $scope.getEvents().then(function() {console.log("Returned promise after calling events!")});

  // $scope.calEvents = CalEvents.get();
  // console.log(CalEvents.get());
  // console.log("$scope.events: ", $scope.events);

  $scope.isReserved = function(day) {
    // console.log("day passed in: ", day);
    // console.log("typeof day.date._d", typeof day.date._d);
    // console.log("first event passed in: ", $scope.calEvents[0]);

    var events = $scope.events.sort(function(a,b) {
      if (a.valueOf() < b.valueOf()) {
          return -1;
      }
      if (a.valueOf() > b.valueOf()) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });
    // console.log("sorted events from isReserved: ", events);
    for (var i = 0; i < events.length; i++) {
        // console.log("day.date", day.date);
        // console.log("events [", i, "].startDate: ", events[i].startDate)
        // console.log("events [", i, "].endDate: ", events[i].endDate)
        // console.log(day.date.isBetween(events[i].startDate, events[i].endDate))
        // console.log(day.date.isAfter("2010-01-01"))
        var startDatePrev = moment(events[i].startDate);
        startDatePrev.date(startDatePrev.date()-1);
        // console.log("startDate: ", events[i].startDate);
        // console.log("startDatePrev: ", startDatePrev);
        if (day.date.isSame(events[i].startDate) || day.date.isSame(events[i].endDate) || day.date.isBetween(startDatePrev, events[i].endDate)) {
            // console.log("found event match for: ", day.date._d.toString());
            return true;
        } else {
          // console.log("no match")
        }
    }
    return false;
  }
})

.directive('calendar', function() {
return {
        restrict: "E",
        templateUrl: "app/directives/calendar/calendar.html",
        scope: {
            selected: "="
        },
        link: function(scope) {
            scope.selected = _removeTime(scope.selected || moment());
            scope.month = scope.selected.clone();

            var start = scope.selected.clone();
            start.date(1);
            _removeTime(start.day(0));

            _buildMonth(scope, start, scope.month);

            scope.select = function(day) {
                scope.selected = day.date; 
                // console.log("clicked on: ", scope.selected); 
            };

            scope.next = function() {
                var next = scope.month.clone();
                _removeTime(next.month(next.month()+1).date(1));
                scope.month.month(scope.month.month()+1);
                _buildMonth(scope, next, scope.month);
            };

            scope.previous = function() {
                var previous = scope.month.clone();
                _removeTime(previous.month(previous.month()-1).date(1));
                scope.month.month(scope.month.month()-1);
                _buildMonth(scope, previous, scope.month);
            };
        }
    };
    
    function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    function _buildMonth(scope, start, month) {
        scope.weeks = [];
        var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
        while (!done) {
            scope.weeks.push({ days: _buildWeek(date.clone(), month) });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    function _buildWeek(date, month) {
        var days = [];
        for (var i = 0; i < 7; i++) {
            days.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }
  })