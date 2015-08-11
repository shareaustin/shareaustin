angular.module('shareAustin')

.controller('AuthCtrl', function inject($scope, Auth){
	$scope.user = {};
})
.controller('SignUpCtrl', function inject($scope, $location, Auth){
	$scope.submitSignUp = function(user){
		Auth.signup(user)
		.then(function(user){
				Auth.setUser(user);
				$location.path('/dashboard')
				
		})
		.catch(function(err){
			console.log(err)
			$location.path('/auth')
		});

	}
})
.controller('SignInCtrl', function inject($scope, $location, Auth){
	$scope.submitSignIn = function(user){
		Auth.signin(user)
		.then(function(user){
				Auth.setUser(user);
				$location.path('/dashboard')
				
		})
		.catch(function(err){
			console.log(err)
			$location.path('/auth')
		});
	}
})