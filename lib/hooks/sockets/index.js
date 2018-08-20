

/**
 * working
 * @type {{register: module.exports.register}}
 */

module.exports = {
    register: function register(app, server, next){
    
        var walk = require('walk');
        
        
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
                ]};
        
            log.info('Socekt.IO Enable - Socket Transports:' + transportsAndLogLevel['transports']);
        
            var sio = require('socket.io', transportsAndLogLevel),
                io = sio(server);
    
                if (_Config.server.cluster) sio_redis = require('socket.io-redis');
        
                // Tell Socket.IO to use the redis adapter. By default, the redis
                // server is assumed to be on localhost:6379. You don't have to
                // specify them explicitly unless you want to change them.
                if (_Config.server.cluster) io.adapter(sio_redis({ host: 'localhost', port: ((_Config.dataStore.redis && _Config.dataStore.redis.portNumber) || 6379) }));
    
            var socketPolicyWalker = walk.walk('./api/policies/sockets', { followLinks: false });
                socketPolicyWalker.on('file', function(root, stat, next) {
                    // Add this file to the list of files
                    var name =  stat.name.substr(0, stat.name.indexOf('.js'));
                    var file =  stat.name;
                    var path = require('path').resolve(root + '/' + file);
            
                    log.info("Socket policy:", name);
                    io.use(require(path));
                
                    next();
                });
    
                socketPolicyWalker.on('end', function() {
                    
                    var socketWalker  = walk.walk('./api/sockets', { followLinks: false });
                        socketWalker.on('file', function(root, stat, next) {
                            // Add this file to the list of files
                            var name =  stat.name.substr(0, stat.name.indexOf('.js'));
                            var file =  stat.name;
                            var path = require('path').resolve(root + '/' + file);
            
                            log.info("Socket:", name);
                            
                            require(path).listen(io, {
                                app: app
                            });
            
                            next();
                        });
    
                });
    
            
        }
        next();
    }
};