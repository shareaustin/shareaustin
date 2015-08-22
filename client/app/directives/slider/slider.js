// Controls picture slider for displaying multiple pictures
angular.module('shareAustin')
.controller('SliderCtrl', function ($scope, Request, Item) {
  // Initialize info
  $scope.myInterval = 0;
  $scope.noWrapSlides = false;
  $scope.slides = [];
  
  // Get photos associates with items, add photo url to slides array
  $scope.getItemPhotos = function() {
    Request.items.itemPhotos(Item.get())
    .then(function(data){
      // console.log("response from server: ", data);
      for (var i = 0; i < data.length; i++) {
        // console.log("Item Photo URL: ", data[i].photo_url);
        $scope.slides.push({'image': data[i].photo_url});
      }
    });
  }
  $scope.getItemPhotos();
})

// Slider directive
.directive('slider', function () {
  return {
    restrict: "E",
    templateUrl: "app/directives/slider/slider.html",
    controller: 'SliderCtrl',
    // scope: {}
  }
})
