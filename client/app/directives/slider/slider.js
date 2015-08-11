angular.module('shareAustin')
.controller('SliderCtrl', function ($scope) {
  $scope.myInterval = 10;
  $scope.noWrapSlides = false;
  $scope.slides = [
    {image: 'http://www.paddleboston.com/rentals/images/canoe.jpg'},
    {image: 'http://www.jonsbushcraft.com/images/canoe2/canoe14.jpg'}
  ];
  // $scope.addSlide = function() {
  //   var newWidth = 600 + $scope.slides.length + 1;
  //   // slides.push({
  //   //   image: '//placekitten.com/' + newWidth + '/300',
  //   //   text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
  //   //     ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
  //   // });
  // };
  // for (var i=0; i<4; i++) {
  //   $scope.addSlide();
  // }
})
.directive('slider', function () {
  return {
    restrict: "E",
    templateUrl: "app/directives/slider/slider.html",
    controller: 'SliderCtrl',
    scope: {}
  }
})
