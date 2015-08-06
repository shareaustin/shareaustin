angular.module('shareAustin')

.controller('DashboardCtrl', function ($scope, Request) {
  $scope.user = {
    first_name: 'Bert',
    last_name: 'Knee',
    username: 'bert_knee',
    photo_url: 'http://img2.wikia.nocookie.net/__cb20150221203401/villains/images/e/ec/Nice-old-lady-1-.jpg' 
  }
  $scope.fetchUser = function() {
  	Request.user.fetch()
  	.then(function (results){
  		$scope.user.first_name = results.first_name;
  		$scope.user.last_name = results.last_name;
  		$scope.user.username = results.username;
  		$scope.user.photo_url = results.photo_url;
  	})
  }
  $scope.fetchUser();
})
