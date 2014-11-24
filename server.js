var io = require('socket.io'),
  connect = require('connect'),
  chat = require('./lib/chat'),
  gch = require('gatewayCommunicationHelper'),
  url = require('url');

var app = connect().use(connect.static('public'));
	app.listen(process.env.PORT || 3005);

var io = io.listen(app);

chat.set_sockets(io.sockets);

io.sockets.on('connection', function (socket) {
  chat.connect({
    socket: socket,
    id: socket.id
  });
  gch.register(socket);
});
