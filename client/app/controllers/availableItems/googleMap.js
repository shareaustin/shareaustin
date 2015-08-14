angular.module('shareAustin')

// This file shares $scope with availableItems.js 
// (think of them as the same controller)     
.expandAvailableItems = function($scope, Request, Helpers) {

  // Sets google map display, zoomed on Austin;
  // Loops through scope.items, creating pins for each item;
  // Sets upp hover, mouseout, and click events.
  $scope.setupMap = function() {

    var mapSettings = {
      zoom      : 13,
      center    : new google.maps.LatLng(30.27415, -97.73996),
      MapTypeId : google.maps.MapTypeId.TERRAIN
    }

    // Creates map and places it in the div with id 'map'
    $scope.map = new google.maps.Map(document.getElementById('map'), mapSettings)

    // Creates a google map pin/marker for each item in scope
    for (var i = 0; i < $scope.items.length; i++) { 
      // Latitude & Longitude
      var latLng = new google.maps.LatLng($scope.items[i].lat, $scope.items[i].lng)
      // Note: item is not a googlemap property; stored in marker for our convenience.
      var markerSettings = {
                              position : latLng,
                              map      : $scope.map,
                              item     : $scope.items[i],
                            };                      
      var newMark   = new google.maps.Marker(markerSettings)

      // Note: stores google maps addListener FUNCTION to a shorter variable name
      var setEvent = google.maps.event.addListener;

      // Mouseover marker event
      setEvent(newMark, 'mouseover', function(event) {
        var customHtml    = Helpers.createHTMLStr(this.item.name, this.item.price_per_day, this.item.photo_url)
        // Save info window to global scope, for use in mouseout event
        window.infoWindow = new google.maps.InfoWindow({content : customHtml, 
                                                        maxWidth: 150         })
        infoWindow.open($scope.map, this) //this refers to the marker that was clicked
      });

      // Event when mouse leaves the marker
      setEvent(newMark, 'mouseout', function(event) {
        
        // Close the info window
        window.infoWindow.close();
      });

      // On click, load the corresponding item to details page
      // and navigate to details page
      setEvent(newMark, 'click', function(event)  {
        // See line #
        $scope.loadDetailedView(this.item);
      });
    } //end for loop
  } // end function setupMap
};