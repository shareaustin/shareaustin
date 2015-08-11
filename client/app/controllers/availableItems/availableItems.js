angular.module('shareAustin')

.controller('AvailableItemsCtrl', function($scope, $window, $location, $window, Request, Item) {

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
      
      var latLng = new google.maps.LatLng($scope.items[i].lat, $scope.items[i].lng)
      var markerSettings = {
                              position : latLng,
                              map      : $scope.map,
                              item     : $scope.items[i]
                            };
      
      var newMark   = new google.maps.Marker(markerSettings)
      var setEvent = google.maps.event.addListener;

      //Event handlers for icons
      setEvent(newMark, 'mouseover', function(event) {
        this.setIcon("http://drdeclutterblog.com/wp-content/uploads/2011/08/canoe.thumbnail.JPG");
      });
      setEvent(newMark, 'mouseout', function(event) {
        this.setIcon(); // Passing in nothing changes icon to default
      });
      setEvent(newMark, 'click', function(event)  {
        $scope.updateItem(this.item);
      });
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
    $location.path('/item-description');
  }
  // Immediately invoked with page
  $scope.fetchAvailableItems()
})
