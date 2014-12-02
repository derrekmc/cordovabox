var port = 3000,
    url = require('url'),
    config = require("./config/config");

var express = require('express');
var app = new express();
var bodyParser  = require('body-parser');
var cookieParser  = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var rootFolder = __dirname + '/' + ((config.site && config.site.rootFolder) || 'public');
var redisPassword = ((config.redis && config.redis.password) || null);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(rootFolder));
app.use(session({
    store: new RedisStore({
        host: 'localhost',
        port: ((config.redis && config.redis.portNumber) || 6379),
        db: 2,
        pass: redisPassword
    }),
    secret: '1234567890QWERTY'
}));

app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
    res.render('index.html', {config: config});
});
app.get('/*', function(req, res, next){
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
});

app.set('views', rootFolder);

// Here you might use middleware, attach routes, etc.
var http = require('http').Server(app);
// Don't expose our internal server to the outside.
var server = app.listen(port, 'localhost'),
    sio = require('socket.io'),
    sio_redis = require('socket.io-redis'),
    io = sio(server),
    sockets = require('./service/socket-room');

// Tell Socket.IO to use the redis adapter. By default, the redis
// server is assumed to be on localhost:6379. You don't have to
// specify them explicitly unless you want to change them.
io.adapter(sio_redis({ host: 'localhost', port: ((config.redis && config.redis.portNumber) || 6379) }));

http.listen(0, function(){
    console.log('listening on *:' + port);
});

sockets.listen(io, {app: app});