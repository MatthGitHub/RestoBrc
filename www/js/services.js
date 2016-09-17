angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Familia Weiss',
    lastText: 'Valte O connor 401, San Carlos de Bariloche, Argentina54-294-443-5789',
    face: 'img/familiaWeis.jpg'
  }, {
    id: 1,
    name: 'Friends',
    lastText: 'Bartolome Mitre 300, San Carlos de Bariloche, Argentina 5423700',
    face: 'img/friends.jpg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://restobrc.firebaseio.com/usuarios");
  return $firebaseArray(itemsRef);
})

.service('UserService', function() {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
});
