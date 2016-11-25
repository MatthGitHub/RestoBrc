angular.module('starter.controllers', ['ionic', 'ngMessages', 'firebase', 'ngCordova', 'ionic-datepicker'])

.controller('ReservasCtrl', function($scope, Reservas) {
  $scope.reservas = Reservas.all();


  $scope.removeReserva = function(reserva) {
    Reservas.remove(reserva);
  };
})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  }, function(error){
    console.log("Could not get location");
  });
})

.controller('RestorantesCtrl', function($scope, Restorantes) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.restorantes = Restorantes.all();

  $scope.removeRestorante = function(restorante) {
    Restorantes.remove(restorante);
  };
})

.controller('RestorantesDetailCtrl', function($scope, $stateParams, Restorantes, $state, $ionicModal, ionicDatePicker) {
  $scope.restorante = Restorantes.get($stateParams.restoranteId);

  $scope.goReservas = function() {
    $state.go('tab.misreservas');
  }

  $scope.showSelectValue = function(mySelect) {
    $scope.data.comensales = mySelect;
    console.log(mySelect);
  }

  //Controlador Ionic DatePikcer
  var ipObj1 = {
   callback: function (val) {  //Mandatory
     fecha = new Date(val);
     console.log('Return value from the datepicker popup is : ' + val, fecha);
     $scope.dia = fecha.getDate()+"/"+fecha.getMonth();
   }
 };

 $scope.openDatePicker = function(){
   ionicDatePicker.openDatePicker(ipObj1);
 };

  //Ventana modal de reserva
  $ionicModal.fromTemplateUrl('reservar.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  $scope.data = {};

  $scope.reservar = function(formReserva) {

    var userId = firebase.auth().currentUser.uid;
    if($scope.dia == null){
      var dia = $scope.data.dia.getDate()+"/"+$scope.data.dia.getMonth();
    }else{
      var dia = $scope.dia;
    }
    if($scope.data.comensale == null){
      var comensales = 2;
    }else{
        var comensales = $scope.data.comensales;
    }

    var resto = $scope.restorante.name;
    var restoId = $scope.restorante.id;


    console.log(dia);

    firebase.database().ref('reservas/').push({
      usuario: userId,
      dia: dia,
      restauranteId: restoId,
      comensales: comensales,
      restaurante: resto
      // function(data) {
      //   $scope.$emit('tab.misreservas:listChanged');
      //   $state.go('tab.misreservas');
        });

    $scope.modal.hide();
  }
})

.controller('AccountCtrl', function($scope, $state) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.salir = function() {
    firebase.auth().signOut().then(function() {
      $state.go('login');
    }, function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }
})

.controller('WelcomeCtrl', function($scope, $state, $q, $ionicLoading, $ionicModal, $stateParams) {

  $ionicModal.fromTemplateUrl('registrarUsuario.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  $scope.data = {};

  // REGISTRAR USUARIO DESDE FORMULARIO - $ionicModal
  $scope.registrar = function(formRegistro) {

    var email = $scope.data.email;
    var password = $scope.data.password;

    // Registro de usuario
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
      $state.go('login');
    }, function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  };

  // VALIDAR USUARIO PARA SU INGRESO
  $scope.ingresar = function(formIngreso) {

    var email = $scope.data.email;
    var password = $scope.data.password;

    // Validacion de datos de usuario
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
      var user = firebase.auth().currentUser;
      $state.go('tab.map');
    }, function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

})
;
