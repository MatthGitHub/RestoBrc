'use strict';

angular.module('myApp.home', ['ngRoute', 'firebase'])

// Route Declaradas
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

// Controlador Home
.controller('HomeCtrl', function($scope, $location){
  // VALIDAR USUARIO PARA SU INGRESO
  $scope.ingresar = function(loginForm) {

    var email = $scope.user.email;
    var password = $scope.user.password;

    // Validacion de datos de usuario
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
      var user = firebase.auth().currentUser;
      console.log("Success on login");
      $location.path('/inicio');
    }, function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

});
