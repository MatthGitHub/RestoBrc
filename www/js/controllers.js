angular.module('starter.controllers', ['ionic', 'ngMessages', 'firebase'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $state) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.salir = function() {
    $state.go('login');
  }
})

.controller("ListCtrl", function($scope, Items, $ionicModal) {
  $scope.items = Items;
  $scope.addItem = function() {
    var name = prompt("What do you need to buy?");
    if (name) {
      $scope.items.$add({
        "usuario": name
      });
    }
  };

  $ionicModal.fromTemplateUrl('nuevaReservaModal.html', {
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

})

.controller('WelcomeCtrl', function($scope, $state, $q, UserService, $ionicLoading, $ionicModal) {

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

      // REGISTRAR USUARIO DESDE FORMULARIO - $ionicModal
      $scope.data = {};
      $scope.registrar = function(formRegistro) {

        var email = $scope.data.email;
        var password = $scope.data.password;

        //Esta funcion se activa con el boton registrar
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          if (error.code) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
          }else{
              closeModal();
          }
        });
        };


      });
