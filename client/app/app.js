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
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/controllers/signUp/signUp.html',
    controller: 'SignUpCtrl'
  })
  .state('availableItems', {
    url: '/all-listings',
    templateUrl: '/app/controllers/availableItems/availableItems.html',
    controller: 'AvailableItemsCtrl'
  })
  .state('transaction', {
    url: '/transaction',
    templateUrl: '/app/controllers/transaction/transaction.html',
    controller: 'TransactionCtrl'
  })
  .state('postNewItem', {
    url: '/new-listing',
    templateUrl: '/app/controllers/postNewItem/postNewItem.html',
    controller: 'PostNewItemCtrl'
  })
  .state('editItem', {
    url: '/edit-item',
    templateUrl: '/app/controllers/updateItems/updateItems.html',
    controller: 'EditItemCtrl'
  })
})
