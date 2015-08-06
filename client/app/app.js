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
  .state('all-listings', {
    url: '/all-listings',
    templateUrl: '/app/controllers/all-listings/all-listings.html',
    controller: 'AllListingsCtrl'
  })
  .state('transaction', {
    url: '/transaction',
    templateUrl: '/app/controllers/transaction/transaction.html',
    controller: 'TransactionCtrl'
  })
  .state('postNewListing', {
    url: '/new-listing',
    templateUrl: '/app/controllers/postNewListing/postNewListing.html',
    controller: 'PostNewListingCtrl'
  })
})
