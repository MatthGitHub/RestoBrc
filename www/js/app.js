// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','firebase', 'ngMessages'])

.run(function($ionicPlatform, $rootScope, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// Funcion para mover las tab a la parte inferior por defecto en
// todos los dispositivos (iOS - Android)
.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'WelcomeCtrl'
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.map', {
    cache: false,
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/tab-map.html',
        controller: 'MapCtrl',
        authRequired: true
      }
    }
  })

  .state('tab.restorantes', {
      url: '/restorantes',
      views: {
        'tab-restorantes': {
          templateUrl: 'templates/tab-restorantes.html',
          controller: 'RestorantesCtrl',
         authRequired: true
        }
      }
    })
    .state('tab.restorante-detail', {
      url: '/restorantes/:restoranteId',
      views: {
        'tab-restorantes': {
          templateUrl: 'templates/restorante-detail.html',
          controller: 'RestorantesDetailCtrl',
          authRequired: true
        }
      }
    })

    .state('tab.misreservas', {
        url: '/misreservas',
        views: {
          'tab-misreservas': {
            templateUrl: 'templates/tab-misreservas.html',
            controller: 'ReservasCtrl',
           authRequired: true
          }
        }
      })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl',
        authRequired: true
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

  });
