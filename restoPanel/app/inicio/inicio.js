'use strict';

angular.module ('myApp.inicio', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/inicio', {
    templateUrl: 'inicio/inicio.html',
    controller:'InicioCtrl'
  });
}])

.controller('InicioCtrl', ['$scope', function ($scope) {

}])
