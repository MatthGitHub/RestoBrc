angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array
  var reportRef = firebase.database().ref('/reservas/').orderByKey();
  reportRef.on('child_added', function(data) {
    console.log(data.val().nombre, data.val().dia);
  });
  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'La Fonda Del Tio',
    direccion: 'Mitre 1190, San Carlos de Bariloche, Río Negro',
    avatar: 'img/fonda_del_tio.jpg',
    telefono: '0294 443-5011',
    horario: '12-15:30 & 20-00',
    tipo: 'Parrilla'
  }, {
    id: 1,
    name: 'Friends',
    direccion: 'Mitre 302, San Carlos de Bariloche, Río Negro',
    avatar: 'img/friends.jpg',
    telefono: '0294 442-3700',
    horario: '08-06',
    tipo: 'Variado'
  }, {
    id: 2,
    name: 'Jauja',
    direccion: 'Elflein 148, 8400 San Carlos de Bariloche, Río Negro',
    avatar: 'img/jauja.jpg',
    telefono: '0294 442-2952',
    horario: '12-15 & 19-00',
    tipo: 'Variado'
  }, {
    id: 3,
    name: 'La Marmite',
    direccion: 'Mitre 329, 8400 San Carlos de Bariloche, Río Negro',
    avatar: 'img/la_marmite.jpg',
    telefono: '0294 443-2198',
    horario: 'Consultar',
    tipo: 'Parrilla'
  }, {
    id: 4,
    name: 'Familia Weis',
    direccion: 'Vice Almte O Connor 1120, San Carlos de Bariloche, Río Negro',
    avatar: 'img/familiaWeis.jpg',
    telefono: 'No disponible',
    horario: '09-20',
    tipo: 'Pasta'
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
