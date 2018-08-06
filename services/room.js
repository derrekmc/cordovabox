var connections= 0;
module.exports = {

    exec: function(req, res){
        res.send({success: 1, message: 'worked ' + req.body.api});
    },

    name: null,
    users: 0,
    io: null,
    options: {
        /**
         * Example of options params
         */
        //app : new require('express'),
        //config: 'config/config'
    },


    create: function(name){
        this.name = config.site.namespace + name;

        io.of('/private/' + this.name).authorization(function (handshakeData, callback) {
            console.dir(handshakeData);
            var secretKey = "V5P4uSKJnwX^HZ+@Z?W8%dQ34?JsVt#FRB6SRR$M9XrMM_wRHybBKRka$JLQa5uDmkpn9D4Pv6VKu?HBM^we3qY_j8sPGYh6#2!q3J^!&HBdJwk$*vQmyXp$m^*^h7=f8v$ArUa2W*rKb&xzP*3R2pBp3ZvydUvbQbmM3yBkF*ahU&=yW+L2@U7xt-aDzujzd5$p7wJWcqTZVbrngaVUbLsZ!jnuZwZqZYps9rZA!y_&wx$cFcHqjGK3sRhAnax88X49z$WBAA&adZWd43S?T&kXB9M+x+7eBQ4Tpu3HKvuhwCJ5hYcT3*$=!P2TwD49@!3upA-#PzJqnaq3kWDDcGZU73vCQ8H+*CHj?Z!x$4y79BtS3dAt73!gm9*2MM!@X9dm_N-WKTQR2kbhg3LHP!Km-Ez*VTNeUvZyndfrnsnRUzf*3t&zLB4fk7_$7YBU$-sHwYe-X+sDNkCqdzGHd9AYN^f5RsFh57k-XgLQG799=Sk3aUJpJHMcSRMGneN-jV49PAx2r3zf$AUBm%G@tj*pzBD6s^F^_NLS=YBUnvxZNkz_g2S&9Rgm#dACxWZF95!QkPdzSs+^29#sfe8w5wqK8xZFS$Q6ggWtNqW*Uuw*CLFp+^U4ckw4pBgDf?dLD&QW-#sdvX&A8f7^2yaHDgNyQhXLrb2rj#+6%32k5?e2ZTZUJ#6$bX83?j44fK@?&!^vasXzAyr&X+?Sz9NeCk8@cKcBPW!NbTQ9-&#!GZtg=UCPH@%t-dXL*n&fAty#TSZryWHN5bkDfktHLUGU8Y#3$cUd2v!FZ&=YZQ+_AL=m57vYwxXT?79&TTWkf=BRHbUx7RN27X97!A5N3jJcknSsVtk?3%St6eBmbndn!yteh#Uhd#@WCAGcPqdzJuDn*2k$aT7%SNEUnhbnC4^f_A4u8ndvtPdxX#Eukk+E*+REnx-_t3aK?W@A2w6qVgKDSsXYT9sh!j_Yxjg!SYsfEK@zSteJ3G%@NPj_JpaSQ5=ehVyq#f-mPADmv2+euCEE";
            // Some basic validation to make sure a token was passed
            if ( handshakeData.query && (handshakeData.query.token === undefined || handshakeData.query.token.length === 0 )) {
                console.error('Token authorization failed');
                callback("connection failed because it is missing a required parameter: token.");
            }else{
                if(!config.sockets.preferred_connections_enabled && this.connections < config.sockets.max_connections) {
                    callback("Max connections reached. Connection to the server has been denied. The server has reached its normal operating limits. Try spawning another node to correct this issue.");
                    //todo spawn another node once this happens.
                }
                console.log(handshakeData);
                // allowing any token value, after this connection will be allowed to proceed.

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


                if(handshakeData._query){
                    handshakeData.room = handshakeData._query.room;
                    handshakeData.username = handshakeData._query.username;
                    handshakeData.sessionId = handshakeData._query.id;
                }

                callback(null, true);

            }
        }).on('connection', function (socket) {

                console.dir(socket.handshake.query);
                console.log(socket.id + ' connected. There are now ' + connections + ' active socket connections to the room');
                connections++;
                /**
                 * join room
                  */
                socket.join(this.name);

                //io.to('some room').emit('some event'):
                socket.emit('roster.add', {
                    name: socket.user.name,
                    id: socket.user.id,
                    container: "roster.users"
                });

                //var roomName = app.req.body.name;

                if(socket.room.type == 'private'){
                    //socket.broadcast.to(id).emit('my message', msg);
                    io.emit('message', 'Private show started.');
                }else{
                    io.emit('message', 'Show started.');
                }

            })

            .on('message', function(msg){
                console.log('Someone sent a message, log it in redis.');
            })

            .on('disconnect', function(socket){
                connections--;
                console.log(socket.id + ' disconnected. There are still ' + connections + ' active socket connections to the room');

                io.emit('roster.remove', {
                    name: socket.user.name,
                    id: socket.user.id,
                    container:"roster.users"
                });

                io.emit('message', 'Welcome to the room');

            });


    },

    destroy: function(){
        //todo to be continued...
    },

    emit: function(message){
        io.to(this.name).emit({cmd:"addUser", username:"derrek"});
    },

    listen: function(io, options) {
        this.options = options;
        this.io = io;
    }

};