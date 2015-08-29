angular.module('shareAustin')

.controller('AuthCtrl', function inject($scope, Auth, $window){
	$scope.active = 'logIn'

	// Determines which tab is selected
  $scope.change = function (status) {
		if (status === 'logIn') $scope.active = true
		if (status === 'signUp') $scope.active = false
	};
})
// Sign up controller
.controller('SignUpCtrl', function inject($scope, $location, Auth, sweet){
	$scope.submitSignUp = function(user){
		// Request goes thru passport to create a user if valid
    Auth.signup(user)
		.then(function(user){
        // Sets user in Auth factory to be used in other files
				Auth.setUser(user);
        // Change location to dashboard
				$location.path('/dashboard')

		})
    // Error Handling
		.catch(function(err){
			console.log(err)
			// Popup which shows errors with improper entry
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
// Sign in controller
.controller('SignInCtrl', function inject($scope, $location, Auth, sweet){
	$scope.submitSignIn = function(user){
		// Passport user validation
    Auth.signin(user)
		.then(function(user){
        //console.log("successful signin response: ", user);
				// Set user in factory for use in other files
        Auth.setUser(user);
        // Brings up dashboard view after succesful sign in
				$location.path('/dashboard')
		})
    // Error handling
		.catch(function(err){
			console.log(err)
      // Popup showing password/username errors
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
