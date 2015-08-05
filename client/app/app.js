angular.module('shareAustin', [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate'
])

.config(function ($stateProvider, $urlRouterProvider) {
  // $urlRouterProvider.otherwise('/')
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
