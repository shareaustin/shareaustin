// Declares an angular module with access to ui.router, ngAnimate etc.
angular.module('shareAustin', [
  'ui.router',
  'ui.bootstrap',
  // 'ngAnimate',
  'btford.socket-io',
  'ngFileUpload',
  'stripe',
  'hSweetAlert',
])
// Injects 'state managers'
.config(function ($stateProvider, $urlRouterProvider) {
   $urlRouterProvider.otherwise('/')

  //  If path is '/dashboard', change to state
  // 'dashboard' which updates used template & controller
  $stateProvider.state ('home', {
    url: '/',
    templateUrl: '/app/controllers/home/home.html',
    controller: 'HomeCtrl'
  })
  .state('dashboard', {
    url: '/dashboard',
    abstract: true,
    templateUrl: '/app/controllers/dashboard/dashboard.html',
    controller: 'DashboardCtrl',
  })
  .state('dashboard.transactionHistory', {
    templateUrl: '/app/controllers/dashboard/transactionHistory.html',
    controller: 'TransactionHistory',
    authenticate: true
  })
  .state('dashboard.currentListings', {
    url: '',
    templateUrl: '/app/controllers/dashboard/currentListings.html',
    controller: 'CurrentListingCtrl',
    authenticate: true
  })
   .state('dashboard.favorites', {
    url: '',
    templateUrl: '/app/controllers/dashboard/favorites.html',
    controller: 'FavoritesCtrl',
    authenticate: true
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
    controller: 'TransactionCtrl',
    authenticate: true
  })
  .state('postNewItem', {
    url: '/new-listing',
    templateUrl: '/app/controllers/postNewItem/postNewItem.html',
    controller: 'PostNewItemCtrl',
    authenticate: true
  })
  .state('itemPrimaryPhoto', {
    url: '/item-primary-photo',
    templateUrl: '/app/controllers/postNewItem/primaryPhoto.html',
    controller: 'ItemPrimaryPhotoCtrl',
    authenticate: true
  })
  .state('editItem', {
    url: '/edit-item',
    templateUrl: '/app/controllers/updateItems/updateItems.html',
    controller: 'EditItemCtrl',
    authenticate: true
  })
  .state('chatList', {
    url: '/chatList',
    templateUrl: '/app/controllers/chatList/chatList.html',
    controller: 'ChatListCtrl',
    authenticate: true
  }).
  state('chatList.chat', {
    url: '',
    templateUrl: '/app/controllers/chatList/chat.html',
    controller: 'ChatCtrl',
    authenticate: true
  })
  .state('feedback', {
    url: "/feedback",
    templateUrl: "/app/controllers/feedback/feedback.html",
    controller: "Feedback",
    authenticate: true
  })
})
//Initializes Stripe
.config(function(){
  Stripe.setPublishableKey('pk_test_xqHKwEIcwAZh73wo8dcYId1h');
})
.run(function($rootScope, $location, $state, Auth){
  $rootScope.$on('$stateChangeStart', function(event, toState){
    Auth.isAuthorized().then(function(user){
      if(toState.authenticate && !user){
        $state.go('auth.signin');
      }
      else{
        Auth.setUser(user);
      }
    });
  });
})
