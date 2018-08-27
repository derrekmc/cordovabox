/**
 * Register Globals
 */
require('./lib/globals');

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
    
    /****************************
     * Start the HTTP Server
     ****************************/
        // Here you might use middleware, attach routes, etc.
    var server = app.listen(port, '0.0.0.0');
    
    /**************************************************
     * Server hooks - middleware
     ***************************************************/
    require('./lib/hooks/index').register(app, server, function(app){
        //require('./config/routes').register(app);
        app.use(express.static(rootFolder));
        app.use(app.router);
        app.emit("cordovabox::" + "server_ready");
    });
            
    function startAppHttpListen(){
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
    }

    app.on("cordovabox::" + "server_ready", startAppHttpListen);
    
    _server = server;
    return server;

}

module.exports = listen;