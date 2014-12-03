require('./config/globals');
var cluster = require('cluster'),
    net = require('net'),
    port = process.env.PORT || 3000,
    num_processes = 1;//Math.floor(require('os').cpus().length*.75);

if (cluster.isMaster) {

    // This stores our workers. We need to keep them to be able to reference
    // them based on source IP address. It's also useful for auto-restart,
    // for example.
    var workers = [];

    // Helper function for spawning worker at index 'i'.
    var spawn = function(i) {
        workers[i] = cluster.fork();

        // Optional: Restart worker on exit
        workers[i].on('exit', function(worker, code, signal) {
            console.log('respawning worker', i);
            spawn(i);
        });


    };

    // Spawn workers.
    for (var i = 0; i < num_processes; i++) {
        spawn(i);
    }

    // Helper function for getting a worker index based on IP address.
    // This is a hot path so it should be really fast. The way it works
    // is by converting the IP address to a number by removing the dots,
    // then compressing it to the number of slots we have.
    //
    // Compared against "real" hashing (from the sticky-session code) and
    // "real" IP number conversion, this function is on par in terms of
    // worker index distribution only much faster.
    var worker_index = function(ip, len) {
        var s = '';
        for (var i = 0, _len = ip.length; i < _len; i++) {
            if (ip[i] !== '.') {
                s += ip[i];
            }
        }
        console.log('worker #' + Number(s) % len);
        return Number(s) % len;
    };

    // Create the outside facing server listening on our port.
    var server = net.createServer(function(connection) {
        // We received a connection and need to pass it to the appropriate
        // worker. Get the worker for this connection's source IP and pass
        // it the connection.

        var worker = workers[worker_index(connection.remoteAddress, num_processes)];

        worker.send('sticky-session:connection', connection);

    }).listen(port);
} else {
    // Note we don't use a port here because the master listens on it for us.
    // Here you might use Socket.IO middleware for authorization etc.

    var
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


    app.use(bodyParser.urlencoded({ extended: false }))
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
    var server = app.listen(0, 'localhost'),
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

    // Listen to messages sent from the master. Ignore everything else.
    process.on('message', function(message, connection) {
        if (message !== 'sticky-session:connection') {
            return;
        }

        // Emulate a connection event on the server by emitting the
        // event with the connection the master sent us.
        server.emit('connection', connection);
    });
}