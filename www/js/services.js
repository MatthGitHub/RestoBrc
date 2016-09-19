angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array
  var reportRef = firebase.database().ref('/restaurantes/').orderByKey();
                  reportRef.on('child_added', function(data) {
                    console.log(data.val().email, data.val().name);
                  });
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
});
