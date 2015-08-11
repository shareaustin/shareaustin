angular.module('shareAustin')
.controller('SliderCtrl', function ($scope) {
  $scope.myInterval = 0;
  $scope.noWrapSlides = false;
  $scope.slides = [
    {image: 'http://www.paddleboston.com/rentals/images/canoe.jpg'},
    {image: 'http://www.jonsbushcraft.com/images/canoe2/canoe14.jpg'},
    {image: '../../img/canoe.jpg'},

  ];
})
.directive('slider', function () {
  return {
    restrict: "E",
    templateUrl: "app/directives/slider/slider.html",
    controller: 'SliderCtrl',
    // scope: {}
  }
})
