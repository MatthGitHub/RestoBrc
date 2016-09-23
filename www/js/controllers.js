angular.module('starter.controllers', ['ionic', 'ngMessages', 'firebase'])

.controller('ReservasCtrl', function($scope, Reservas) {
  $scope.reservas = Reservas.all();

  $scope.removeReserva = function(chat) {
    Reservas.remove(reserva);
  };


})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();

  $scope.removeChat = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $state, $ionicModal) {
  $scope.chat = Chats.get($stateParams.chatId);

  $scope.goReservas = function() {
    $state.go('tab.dash');
  }

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
    var dia = $scope.data.dia;
    var resto = $scope.chat.name;

    firebase.database().ref('reservas/').push({
      usuario: userId,
      dia: dia,
      restaurante: resto
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
      $state.go('tab.dash');
    }, function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

});
