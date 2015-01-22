var _server = null;

function listen(port, callback){
    callback = callback || function(){};

    /**
     * Express/Session/Store Section
     * Add express related requires here
     * @type {*|http.Server}
     */
    var url = require('url');
    var express = require('express');
    var app = new express();
    var bodyParser  = require('body-parser');
    var cookieParser  = require('cookie-parser');
    var session = require('express-session');
    var RedisStore = require('connect-redis')(session);
    var rootFolder = __dirname + '/' + ((_Config.site.rootFolder) || 'public');
    var redisPassword = ((_Config.redis.password) || null);
    var restPolicy = require("./policy/rest");

    /*********************
     * Routes/Views Start
     *********************/

    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'ejs');
    app.set('views', rootFolder);

    app.get('/*', function(req, res, next){
        log.silly('Request:', req.path);
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

    app.use(restPolicy);

    var routes = require('./config/routes');
    routes.register(app);

    /*app.get('/', function(req, res) {
        res.render('index.html', {title: _Config.Application.name});
    });*/

    /*********************
     * Routes/Views End
     *********************/

    // Here you might use middleware, attach routes, etc.
    var http = require('http').Server(app);

    /**
     * Socket IO Section
     * Add socket io related requires here
     * @type {*|http.Server}
     */
    // Don't expose our internal server to the outside. '0.0.0.0' is for nitrous io servers
    var server = app.listen(port, '0.0.0.0'),
        sio = require('socket.io', {
            'transports': [
                  'websocket'
                , 'flashsocket'
                , 'htmlfile'
                , 'xhr-polling'
                , 'jsonp-polling'
            ],
            'log level': 1
        }),
        sio_redis = require('socket.io-redis'),
        io = sio(server),
        sockets = require('./service/socket'),
        socketPolicy = require('./policy/socket');

        io.use(socketPolicy);

    // Tell Socket.IO to use the redis adapter. By default, the redis
    // server is assumed to be on localhost:6379. You don't have to
    // specify them explicitly unless you want to change them.
    io.adapter(sio_redis({ host: 'localhost', port: ((_Config.redis && _Config.redis.portNumber) || 6379) }));

    http.listen(0, function(){
        if(_server && _Config.Application.showLogo) {
            log.info("                          ");
            log.info("         --------------   ");
            log.info("        |              |  ");
            log.info("        |              |  ");
            log.info("        |  CordovaBox  |  ");
            log.info("        |     .io      |  ");
            log.info("        |              |  ");
            log.info("        |              |  ");
            log.info("         --------------   ");
            log.info("                          ");
            log.info("                          ");
        }
        callback(port);
    });

    sockets.listen(io, {
        app: app
    });

    _server = server;
    return server;

}

module.exports = listen;