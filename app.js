require('./config/globals');
var _server = null;

function listen(port){
    if(port != 0){
        port = port || 3000;
    }
    var url = require('url');
    var express = require('express');
    var app = new express();
    var bodyParser  = require('body-parser');
    var cookieParser  = require('cookie-parser');
    var session = require('express-session');
    var RedisStore = require('connect-redis')(session);
    var rootFolder = __dirname + '/' + ((_Config.site.rootFolder) || 'public');
    var redisPassword = ((_Config.redis.password) || null);
    var policy = require("./policy/isAuthenticated");
    /*********************
     * Routes/Views Start
     */
    app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'ejs');
    app.set('views', rootFolder);
    app.get('/', function(req, res) {
        res.render('index.html', {config: _Config});
    });
    app.get('/*', function(req, res, next){
        res.setHeader('Last-Modified', (new Date()).toUTCString());
        next();
    });
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(express.static(rootFolder));
    app.use(app.router);
    app.use(session({
        store: new RedisStore({
            host: 'localhost',
            port: ((_Config.redis && _Config.redis.portNumber) || 6379),
            db: 2,
            pass: redisPassword
        }),
        secret: '1234567890QWERTY'
    }));
    app.use(policy);
    var routes = require('./config/routes');
    routes.register(app);
    /**
     * Routes/Views End
     *********************/

// Here you might use middleware, attach routes, etc.
    var http = require('http').Server(app);
// Don't expose our internal server to the outside.
    var server = app.listen(port, 'localhost'),
        sio = require('socket.io'),
        sio_redis = require('socket.io-redis'),
        io = sio(server),
        sockets = require('./service/socket');

// Tell Socket.IO to use the redis adapter. By default, the redis
// server is assumed to be on localhost:6379. You don't have to
// specify them explicitly unless you want to change them.
    io.adapter(sio_redis({ host: 'localhost', port: ((_Config.redis && _Config.redis.portNumber) || 6379) }));

    http.listen(port, function(){
        console.log('listening on *:' + port);
    });

    sockets.listen(io, {
        app: app
    });
    _server = server;
    return server;
};

if(!_server) listen(process.env.PORT || 3000);
module.exports = listen;