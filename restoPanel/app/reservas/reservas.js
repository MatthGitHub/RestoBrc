'use strict';

angular.module('myApp.reservas', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/reservas', {
    templateUrl: 'reservas/reservas.html',
    controller: 'reservasCtrl'
  });
}])

.controller('reservasCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray){

  var ref = firebase.database().ref().child ('reservas');
  var reservas = firebaseArray(ref);
  //$scope.reservas = $firebaseArray(ref);


  if(reservas.val().)

}]);
