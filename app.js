/**
 * Register Globals
 */
require('./config/globals');

var _server = null;

function listen(port, callback){
    callback = callback || function(){};
    if(port === 0) _Config.server.cluster = true;

    /***********************************
     * Express/Session/Store Section
     * Add express related requires
     ***********************************/
    var url = require('url');
    var express = require('express');
    var app = new express();
    var bodyParser  = require('body-parser');
    var cookieParser  = require('cookie-parser');
    var session = require('express-session');
    if (_Config.server.redisSessions) var RedisStore = require('connect-redis')(session);
    var rootFolder = __dirname + '/' + ((_Config.site.rootFolder) || 'public');
    var redisPassword = ((_Config.dataStore.redis.password) || null);

    //var restPolicy = require("./policies/rest");
    //var blockedIps = require("./policies/blockedIps");
    //var isProtected = require("./policies/isProtected");
    //var trackUTM = require("./policies/trackUTM");


    /****************
     * Routes/Views *
     ****************/
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'ejs');
    app.set('views', rootFolder);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use(session({
        store: (_Config.server.redisSessions ? new RedisStore({
            host: (_Config.dataStore.redis && _Config.dataStore.redis.host),
            port: ((_Config.dataStore.redis && _Config.dataStore.redis.portNumber) || 6379),
            db: 0,//_Config.dataStore.redis.database,
            pass: redisPassword,
            ttl: (1000 * 60 * 30)
        }) : null),
        secret: '1234567890QWERTY'
    }));

    //app.use(restPolicy);
    //app.use(blockedIps);
    //app.use(isProtected);
    //app.use(trackUTM);

    /**
     * Load hooks todo incomplete
     */
    require('./lib/hooks/index').register(app);

    app.get('*', function(req, res, next){
        log.debug('Request:', req.path, req.method);

        if(!_Config.server.caching) res.setHeader('Last-Modified', (new Date()).toUTCString());

        if(_Config.server.https && req.headers['x-forwarded-proto']!='https'){
            res.redirect('https://' + req.headers.host.split(":", 1) + req.url)
        }else{
            next(); //Continue to other routes if we're not redirecting
        }

    });

    app.use(express.static(rootFolder));
    app.use(app.router);

    require('./config/routes').register(app);



    var server = app.listen(port, '0.0.0.0');
    /****************************
     * Socket IO Startup *
     ****************************/

    if(_Config.server.socketIO){
        // Don't expose our internal server to the outside. '0.0.0.0' is for nitrous io servers
        var transportsAndLogLevel = {
            'transports': [
                'websocket',
                'htmlfile',
                'xhr-polling',
                'jsonp-polling'
            ]}

        log.info('Socekt.IO Enable - Socket Transports:' + transportsAndLogLevel['transports']);

        var sio = require('socket.io', transportsAndLogLevel),
            io = sio(server),
            sockets = require('./services/socket'),
            socketPolicy = require('./policies/socket');
        io.use(socketPolicy);

        if (_Config.server.cluster) sio_redis = require('socket.io-redis');

        // Tell Socket.IO to use the redis adapter. By default, the redis
        // server is assumed to be on localhost:6379. You don't have to
        // specify them explicitly unless you want to change them.
        if (_Config.server.cluster) io.adapter(sio_redis({ host: 'localhost', port: ((_Config.dataStore.redis && _Config.dataStore.redis.portNumber) || 6379) }));

        sockets.listen(io, {
            app: app
        });

    }

    /**************************************************
     * Additional Requires Application Specifics go here
     ***************************************************/


    /****************************
     * Start the HTTP Server
     ****************************/
        // Here you might use middleware, attach routes, etc.
    var http = require('http').Server(app);

    http.listen(0, function(){
        if(_server && _Config.application.logo.show) {
            log.info("                          ");
            log.info("         --------------   ");
            log.info("        |              |  ");
            log.info("        |              |  ");
            log.info("        |  " + _Config.application.logo.title + "  |  ");
            log.info("        |     " + _Config.application.logo.subTitle + "      |  ");
            log.info("        |              |  ");
            log.info("        |              |  ");
            log.info("         --------------   ");
            log.info("                          ");
            log.info("                          ");
        }
        callback(port);
    });

    _server = server;
    return server;

}

module.exports = listen;