let ejs = require('ejs');
const path = require('path');
const cordovaboxPath = path.resolve(`./node_modules/cordovabox/lib/hooks/index`);
/**
 * Register Globals
 */
require('./globals');

var _server = null;

async function listen(port, callback){

    if(port === 0) _Config.server.cluster = true;

    /***********************************
     * Express/Session/Store Section
     * Add express related requires
     ***********************************/
    var url = require('url');
    var express = require('express');
    var router = express.Router();
    var app = new express();
    var bodyParser  = require('body-parser');

    var cookieParser  = require('cookie-parser');
    var session = require('express-session');
    if (_Config.server.redisSessions) var RedisStore = require('connect-redis')(session);
    var rootFolder = path.resolve('.') + '/' + ((_Config.site.rootFolder) || 'public' + '/');
    var redisPassword = ((_Config.dataStore.redis.password) || null);
    // console.log("EJS View Folder:", rootFolder)

    /****************
     * Routes/Views *
     ****************/
    app.engine('html', require('ejs').renderFile);

    // app.set('view engine', 'ejs');
    // app.set('views', rootFolder);

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

    function startAppHttpListen(){
        // var http = require('http').Server(app);
        //     http.listen(0, function(){
        if(_Config.application.logo.show) {

            log.info("                          ");
            log.info("         --------------   ");
            log.info("        |              |  ");
            log.info("        |  CordovaBox  |");
            log.info("        |              |  ");
            log.info("         --------------   ");
            log.info("                          ");

        }
                // callback(port);
        log.info("");
        log.info(_Config.application.name + " is now listening on port: " + port);
        if(!String(process.env.NODE_ENV).includes('prod')) log.info(`Available at: http://localhost:${port}`);
        log.info("");
            // });
    }

    app.on("cordovabox::" + "server_ready", startAppHttpListen);
    // console.log("PATH****", cordovaboxPath);
    await require(cordovaboxPath).register(app, server);
    app.use(express.static(rootFolder));
    app.emit("cordovabox::" + "server_ready");
    app.listen(port);
    _server = server;
    return server;

}

module.exports.listen = listen;
