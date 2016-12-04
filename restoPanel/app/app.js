'use strict';

angular.module('myApp', [
    'ngRoute',
    'myApp.home',           // Modulo de home.js
    'myApp.inicio',         // Modulo de inicio.js
    'myApp.addResto',       // Modulo de addResto.js
    'myApp.reservas'        // Modulo de reservas.js
])

.config(['$routeProvider', function($routeProvider) {
    // Ubicacion predeterminada de la vista
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);
