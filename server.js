require('./config/globals');
var io = require('socket.io'),
  connect = require('connect'),
  chat = require('./lib/chat'),
  gch = require('./lib/gatewayCommunicationHelper'),
  url = require('url'),
  sockets = require('./service/sockets');

var app = connect().use(connect.static('public'));
	app.listen(process.env.PORT || 3005);

var io = io.listen(app);

sockets.register(app, io);
/*
io.sockets.on('connection', function (socket) {
  chat.connect({
    socket: socket,
    id: socket.id
  });
  //gch.register(socket);
});
*/