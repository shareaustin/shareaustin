angular.module('shareAustin')
.controller('SliderCtrl', function ($scope, Request, Item) {
  $scope.myInterval = 0;
  $scope.noWrapSlides = false;
  $scope.slides = [];
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
.directive('slider', function () {
  return {
    restrict: "E",
    templateUrl: "app/directives/slider/slider.html",
    controller: 'SliderCtrl',
    // scope: {}
  }
})
