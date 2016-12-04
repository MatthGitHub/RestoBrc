'use strict';

angular.module('myApp.addResto', ['ngRoute', 'firebase'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/addresto', {
    templateUrl: 'addresto/addresto.html',
    controller: 'addRestoCtrl'
  });
}])

.controller('addRestoCtrl', ['$scope', function($scope){

  $scope.resto = {};

  $scope.agregarResto = function(addRestoForm) {

    // Crea las variables con la info del formulario.
    var userId = firebase.auth().currentUser.uid;
    var name = $scope.resto.nombre;
    var street = $scope.resto.calle;
    var number = $scope.resto.nro;
    var ca = $scope.resto.ca;
    var phone = $scope.resto.telefono;
    var city = $scope.resto.ciudad;
    var state = $scope.resto.provincia;

    // Arma el restoId, acronimo del nombre + telefono
    var matches = name.match(/\b(\w)/g);
    var matchesjoin = matches.join('');
    var restoId = matchesjoin.concat(phone);

    // Arma el telefono completo. Codigo de Area + Telefono
    var fullPhone = ca.concat('-' + phone);

    firebase.database().ref('restaurantes/').push({
      usuarioId: userId,
      restoId: restoId,
      nombre: name,
      calle: street,
      numero: number,
      telefono: fullPhone,
      ciudad: city,
      provincia: state
    });
  }
}]);
