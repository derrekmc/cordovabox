var all_sockets = null;

exports.set_sockets = function (sockets) {
  all_sockets = sockets;
};

exports.connect = function (client) {
  var clientId = (client.id).toString();

  all_sockets.emit('data', {cmd: 'addUser', username: client.username, type: client.clientType, id: clientId});

  client.socket.on('disconnect', function () {
     all_sockets.emit('data', {cmd: 'removeUser', id: clientId, message: 'User left.'});
  });

  client.socket.on('data', function (data) {
      all_sockets.emit('data', data);
  });
  
};

exports.failure = function (socket) {
  socket.emit('error', {message: 'Please log in to the chatroom.'});
};