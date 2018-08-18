var jwt = require('jwt-simple');
module.exports = function isSocketAuthenticated(socket, next){

    /**
     * bootstrap security here
     * Check session data for access here
     */

    if(socket && socket.hasOwnProperty('handshake')){
        
    
        var Query = socket.handshake.query;
    
        var publicKey = _Config.security.jwt.public.key;
        var secureKey = _Config.security.jwt.secure.key;
        var token = Query.token;
    
        // Some basic validation to make sure a token was passed
        if (Query && (token === undefined || token.length === 0 )) {
    
            console.error('Token authorization failed');
            next(new Error("connection failed because it is missing a required parameter: token."));
    
        } else {
    
            if (token === publicKey) {
                Query.roomType = 'public';
                log.silly('Public socket security policy accessed: ' + publicKey);
            }
    
            if (token === secureKey) {
                Query.roomType = 'secure';
    
                // decode using HS512
                var decoded = jwt.decode(token, secureKey);
                log.silly('Secure socket security policy accessed: ' + decoded, token, secureKey);
            }
    
            if (!_Config.sockets.preferred_connections_enabled && _Stats.active_connections < _Config.sockets.max_connections) {
                callback("Max connections reached. Your connection to the server has been denied. The server has reached its perfered operating limits. Try spawning another node to correct this issue or turn on auth spawn to prevent this issuing from continuing further.");
                //todo spawn another node if autospawn is enabled.
            }
    
            // allowing any token value, after this connection will be allowed to proceed.
            /*if(socket.room.type == 'private'){
             //socket.broadcast.to(id).emit('my message', msg);
             io.emit('message', 'Private show started.');
             }else{
             io.emit('message', 'Show started.');
             }*/
            /**
             * Sudo code
             * check if the user
             * look up the user
             * log them in
             * and then attach them to the session
             *
             */
            /**
             * session.room = socket.io namespace;
             * session.user = foundUser;
             */
    
            /*User.find(id, function(){
             var nsp = io.of('/my-namespace');
             nsp.on('connection', function(socket){
             console.log('someone connected');
             });
             nsp.emit('hi', 'everyone!');
             });*/
    
        }
    
        if (socket.request.headers.cookie) {
            return next();
        }
    
    }

    //next(new Error('Socket Authentication error'));
    log.warn('Socket Authentication error');
    next();

};