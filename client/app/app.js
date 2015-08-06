// Declares an angular module with access to ui.router, ngAnimate etc.
angular.module('shareAustin', [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate'
])
// Injects 'state managers'
.config(function ($stateProvider, $urlRouterProvider) {
  // $urlRouterProvider.otherwise('/')
  
  //  If path is '/dashboard', change to state 
  // 'dashboard' which updates used template & controller
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    // abstract: true,
    templateUrl: '/app/controllers/dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  })
  .state('signin', {
    url: '/signin',
    templateUrl: 'app/controllers/signin/signin.html',
    controller: 'SignInCtrl'
  })
  // .state('listing', {
  //   url: '/listing',
  //   abstract: true,
  //   templateUrl: '/app/controllers/listing/listing.html',
  //   controller: 'ListingCtrl'
  // })
})
