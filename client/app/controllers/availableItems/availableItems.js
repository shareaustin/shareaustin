angular.module('shareAustin')

.controller('AvailableItemsCtrl', function($scope, Request, Item) {

  $scope.currentItem = {};
  $scope.items = [];

  $scope.setupMap = function() {
    console.log($scope.items)

    // Austin view centered on capitol building
    var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(30.27415, -97.73996),
      mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    // Places map in container with id 'map'
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions)

    // For each item, place a marker corresponding to its latitude and longitude
    for (var i = 0; i < $scope.items.length; i++) {
      console.log("for loop")
      // Create marker, set on map
      var latLng = new google.maps.LatLng($scope.items[i].lat, $scope.items[i].lng)
      var markerSettings = {
                              position : latLng,
                              map      : $scope.map,
                              //icon     : "http://drdeclutterblog.com/wp-content/uploads/2011/08/canoe.thumbnail.JPG",
                            };
      var newMark   = new google.maps.Marker(markerSettings)
      var setEvent = google.maps.event.addListener;

      setEvent(newMark, 'mouseover', function(event) {
        newMark.setIcon("http://drdeclutterblog.com/wp-content/uploads/2011/08/canoe.thumbnail.JPG");
      });
      setEvent(newMark, 'mouseout', function(event) {}
        newMark.setIcon();
      });
      

      //newMark.setMap($scope.map);
    }
  }

  // Fetches all available items for display
  $scope.fetchAvailableItems = function() {
    Request.items.fetchAvailableItems()    
      .then(function (results){
        $scope.items = results;

        // Setup map AFTER allitems have been fetched
        $scope.setupMap();
      })
  };

  // Changes item selected for detailed viewing
  $scope.updateItem = function ($event) {
    console.log("Event ", $event)
    Item.set($event)
  }

  // Immediately invoked with page
  $scope.fetchAvailableItems()
})
