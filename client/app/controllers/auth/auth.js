angular.module('shareAustin')

.controller('AuthCtrl', function inject($scope, Auth){
	$scope.active = 'logIn'
	$scope.change = function (status) {
		if (status === 'logIn') $scope.active = true
		if (status === 'signUp') $scope.active = false
	};
})
.controller('SignUpCtrl', function inject($scope, $location, Auth, sweet){
	$scope.submitSignUp = function(user){
		Auth.signup(user)
		.then(function(user){
				Auth.setUser(user);
				$location.path('/dashboard')

		})
		.catch(function(err){
			console.log(err)
			sweet.show({
            title: "<small>Error</small>",
            text: '<p>' + err.data.substr(6, err.data.indexOf('<') - 1) + '</p>',
            type: 'error',
            html: true
        });
			// $location.path('/auth')
		});

	}
})
.controller('SignInCtrl', function inject($scope, $location, Auth, sweet){
	$scope.submitSignIn = function(user){
		Auth.signin(user)
		.then(function(user){
        console.log("successful signin response: ", user);
				Auth.setUser(user);
				$location.path('/dashboard')

		})
		.catch(function(err){
			console.log(err)
			sweet.show({
            title: "<small>Error</small>",
            text: '<p>' + err.data.substr(6, err.data.indexOf('<') - 1) + '</p>',
            type: 'error',
            html: true
        });
			// $location.path('/auth')
		});
	}
})
