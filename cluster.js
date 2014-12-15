require('./config/globals');
var cluster = require('cluster'),
    net = require('net'),
    cluster_port = process.env.PORT || 3000,
    num_processes = Math.floor(require('os').cpus().length * (parseFloat(_Config.server.process.max_spawn) / 100.0));

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

        return Number(s) % len;
    };

    // Create the outside facing server listening on our port.
    var server = net.createServer(function(connection) {
        // We received a connection and need to pass it to the appropriate
        // worker. Get the worker for this connection's source IP and pass
        // it the connection.

        var worker = workers[worker_index(connection.remoteAddress, num_processes)];

        worker.send('sticky-session:connection', connection);

    }).listen(cluster_port);
} else {
    // Note we don't use a port here because the master listens on it for us.
    // Here you might use Socket.IO middleware for authorization etc.
    /**
     * We call the application to spawn up some nodes
     */
    var server = require('./app')(0);

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