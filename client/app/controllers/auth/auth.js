angular.module('shareAustin')

.controller('AuthCtrl', function inject($scope, Auth){
	$scope.active = 'logIn'
	// Determines which tab is selected
  $scope.change = function (status) {
		if (status === 'logIn') $scope.active = true
		if (status === 'signUp') $scope.active = false
	};
})
<<<<<<< HEAD
// Sign up controller
.controller('SignUpCtrl', function inject($scope, $location, Auth, sweet){
=======
.controller('SignUpCtrl', function inject($scope, $state, $location, Auth, sweet){
>>>>>>> user always loads in dashboard
	$scope.submitSignUp = function(user){
		// Request goes thru passport to create a user if valid
    Auth.signup(user)
		.then(function(user){
        // Sets user in Auth factory to be used in other files
				Auth.setUser(user);
<<<<<<< HEAD
        // Change location to dashboard
				$location.path('/dashboard')
=======
				//$location.path('/dashboard')
        $state.go('dashboard.currentListings');

>>>>>>> user always loads in dashboard
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
<<<<<<< HEAD
// Sign in controller
.controller('SignInCtrl', function inject($scope, $location, Auth, sweet){
=======
.controller('SignInCtrl', function inject($scope, $location, $state, Auth, sweet){
>>>>>>> user always loads in dashboard
	$scope.submitSignIn = function(user){
		// Passport user validation
    Auth.signin(user)
		.then(function(user){
<<<<<<< HEAD
        console.log("successful signin response: ", user);
				// Set user in factory for use in other files
        Auth.setUser(user);
        // Brings up dashboard view after succesful sign in
				$location.path('/dashboard')
=======
//        console.log("successful signin response: ", user);
				Auth.setUser(user);
				//$location.path('/dashboard')
        $state.go('dashboard.currentListings');

>>>>>>> user always loads in dashboard
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
