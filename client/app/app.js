// Declares an angular module with access to ui.router, ngAnimate etc.
angular.module('shareAustin', [
  'ui.router',
  'ui.bootstrap',
  // 'ngAnimate',
  'stripe',
  'hSweetAlert'
])
// Injects 'state managers'
.config(function ($stateProvider, $urlRouterProvider) {
   $urlRouterProvider.otherwise('/auth')

  //  If path is '/dashboard', change to state
  // 'dashboard' which updates used template & controller
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    abstract: true,
    templateUrl: '/app/controllers/dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  })
  .state('dashboard.transactionHistory', {
    templateUrl: '/app/controllers/dashboard/transactionHistory.html',
    controller: 'TransactionHistory'
  })
  .state('dashboard.currentListings', {
    url: '',
    templateUrl: '/app/controllers/dashboard/currentListings.html',
    controller: 'CurrentListingCtrl'
  })
   .state('dashboard.favorites', {
    url: '',
    templateUrl: '/app/controllers/dashboard/favorites.html',
    controller: 'FavoritesCtrl'
  })
  .state('auth', {
    abstract: true,
    url: '/auth',
    templateUrl: '/app/controllers/auth/auth.html',
    controller: 'AuthCtrl'
  })
  .state('auth.signin', {
    url: '',
    templateUrl: 'app/controllers/auth/signin.html',
    controller: 'SignInCtrl'
  })
  .state('auth.signup', {
    templateUrl: 'app/controllers/auth/signup.html',
    controller: 'SignUpCtrl'
  })
  .state('availableItems', {
    url: '/all-listings',
    templateUrl: '/app/controllers/availableItems/availableItems.html',
    controller: 'AvailableItemsCtrl'
  })
  .state('itemDescription', {
    url: '/item-description',
    templateUrl: '/app/controllers/itemDescription/itemDescription.html',
    controller: 'ItemDescriptionCtrl'
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
//Initializes Stripe
.config(function(){
  Stripe.setPublishableKey('pk_test_xqHKwEIcwAZh73wo8dcYId1h');
})
