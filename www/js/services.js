angular.module('starter.services', [])

.factory('Restorantes', function() {
  // Might use a resource here that returns a JSON array

  var db = firebase.database();
  var ref = db.ref('/restaurantes/');
  var restorantes = [];

  var restosref = ref.on('value', function(data) {
    var i = 0;
    data.forEach(function(resto) {
      i++;
      var arr2 = {};
      console.log('resto a %s el en %s ',resto.val().nombre, resto.val().calle);

      arr2 = {
        id:resto.val().restoId,
        nombre: resto.val().nombre,
        telefono: resto.val().telefono,
        calle: resto.val().calle,
        numero: resto.val().numero,
        ciudad: resto.val().ciudad,
        provincia: resto.val().provincia,
        usuarioId: resto.val().usuarioId
       };
      restorantes.push(arr2);
   });
  });

  console.log(restorantes);

  return {
    all: function() {
      return restorantes;
    },
    remove: function(restorante) {
      chats.splice(restorantes.indexOf(restorante), 1);
    },
    get: function(restoranteId) {
      for (var i = 0; i < restorantes.length; i++) {
        if (restorantes[i].id === (restoranteId)) {
          return restorantes[i];
        }
      }
      return null;
    }
  };
})

.factory('Reservas', function(){
  var db = firebase.database();
  var ref = db.ref('/reservas/');
  var reservas = [];

  var referencias = ref.on('value', function(data) {
    var i = 0;
    data.forEach(function(reserva) {
      i++;
      var arr2 = {};
      console.log('reserva a %s el dia %s ',reserva.val().restaurante, reserva.val().dia);

      arr2 = {
        id:i,
        restaurante: reserva.val().restaurante,
        dia: reserva.val().dia,
        personas: reserva.val().comensales,
        usuario: reserva.val().usuario
       };
                 if(arr2.usuario == firebase.auth().currentUser.uid){
                    reservas.push(arr2);
                 }

   });
  });

  return {
    all: function() {
      return reservas;
    },
    remove: function(reserva) {
      restorantes.splice(chats.indexOf(reserva), 1);
    },
    get: function(reservaId) {
      for (var i = 0; i < reservas.length; i++) {
        if (reservas[i].id === parseInt(reservaId)) {
          return reservas[i];
        }
      }
      return null;
    }
  };

});
