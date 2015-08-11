angular.module('shareAustin')
.controller('SliderCtrl', function ($scope) {
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  var slides = $scope.slides = [
    {image: 'http://lorempixel.com/400/200/'},
    {image: 'http://www.lorempixel.com/400/200/'}
  ];
  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    // slides.push({
    //   image: '//placekitten.com/' + newWidth + '/300',
    //   text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
    //     ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    // });
  };
  for (var i=0; i<4; i++) {
    $scope.addSlide();
  }
})
.directive('slider', function () {
  return {
    restrict: "E",
    templateUrl: "slider.html",
    scope: {}
  }
})
