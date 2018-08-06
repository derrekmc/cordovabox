var uuid = require('uuid');

module.exports = new function Sockets(){
    return {
    io: null,
    app: null,
    crud: null,
    options: {
        /**
         * Example of options params
         */
        // crud adapter
        //app : new require('express'),
        //config: 'config/config'
        //session
        //req, res
    },

    listen: function listen(io, options) {

        var options = options || {};
        var app = options.app || null;
        var crud = options.crud || null;
        this.io = io;
        var self = this;

        io.on('connection', function (socket) {

            _Stats.active_connections++;

            var Query = socket.handshake.query;

            /**
             * Map rest point
             * socket.get('/user', function(err, user){
             *      if(!err){
             *      }
             *      User = user;
             * });
             */
                // User.findOne({id: 45}, function(err, user){ if(!err) { log(user.name); }});

            socket.leaveAll();
            socket.join(Query.room);

            var User = {
                token   : Query.token   || null,
                name    : Query.name    || 'guest', //todo name change
                type    : Query.type    || 1,
                id      : Query.id      || uuid.v4()
            };

            var Room                = socket.adapter.rooms[Query.room];
                Room.name           = Query.room || 'lobby';
                Room.messages       = Room.messages || [];
                Room.users          = Room.users || {};
                Room.users[User.id] = (UserDTO(User));
                Room.users.length   = Room.users.length || 0;
                Room.users.length++;

            log.info(socket.id + ' connected. ' + _Stats.active_connections + ' active socket connections.');

            _Stats.active_rooms = socket.adapter.rooms;

            socket.emit(Room.name).emit('room.update', RoomDTO(Room));

            socket.on('room.change', function(data){

                log.verbose('User ' + User.name + ' is changing rooms from ' + Room.name + ' to ' + data.room);
                /**
                 * Remove user from old room
                 */
                io.to(Room.name).emit('user.destroy', UserDTO(User));
                Room.users.length--;
                log.silly(Room.users.length + " users in " + Room.name);
                delete(Room.users[User.id]);
                /**
                 * Remove user from old room end
                 */

                /**
                 * Leave socket room and reset user and room data
                 */
                socket.leaveAll();
                socket.join(data.room);

                User = {
                    token   : data.token   || null,
                    name    : data.name    || 'guest', //todo name change
                    type    : data.type    || 1,
                    id      : data.id      || uuid.v4()
                };

                Room = socket.adapter.rooms[data.room];
                Room.name = data.room || 'lobby';

                log.info(socket.id + ' connected. ' + _Stats.active_connections + ' active socket connections.');

                Room.messages   = Room.messages || [];
                Room.users          = Room.users || {};
                Room.users[User.id] = (UserDTO(User));
                Room.users.length   = Room.users.length || 0;
                Room.users.length++;

                log.silly(Room.users.length + " users in " + Room.name);
                /**
                 * Leave socket room and reset user and room data
                 */

                /**
                 * Socket ready code data sync with new room client
                 */
                log.silly(Room.name + " data syncing with client");

                socket.emit(Room.name).emit('room.create', RoomDTO(Room));

                Room.messages.forEach(function(element){
                    socket.emit('message', UserDTO(element, {
                        value     : element.value
                    }));
                });

                /**
                 * loops through object and sends the message history
                 */
                for(var i in Room.users){
                    var element = Room.users[i];
                    if(element.hasOwnProperty('id') && User.id != element.id){
                        socket.emit('user.create', UserDTO(element, {
                            value     : element.value
                        }));
                    }
                }

                /**
                 * Send new user and room object to the client
                 */

                io.to(Room.name).emit('user.create', UserDTO(User));
                /**
                 * Socket ready code data sync with new room client end
                 */

            });

            socket.on('ready', function(data){

                log.silly(Room.name + " data syncing with client");

                socket.emit(Room.name).emit('room.create', RoomDTO(Room));

                Room.messages.forEach(function(element){
                    socket.emit('message', UserDTO(element, {
                        value     : element.value
                    }));
                });

                /**
                 * loops through object and sends the data
                 */
                for(var i in Room.users){
                    var element = Room.users[i];
                    if(element.hasOwnProperty('id') && User.id != element.id){
                        socket.emit('user.create', UserDTO(element, {
                            value     : element.value
                        }));
                    }
                }

                io.to(Room.name).emit('user.create', UserDTO(User));

            });

            socket.on('message', function (data) {

                log.silly("("+Room.name+")", User.name, 'said', data.value);

                Room.messages.push(UserDTO(User, {
                    value     : data.value
                }));

                if(Room.messages.length > 20) Room.messages.pop();

                io.to(Room.name).emit('message', UserDTO(User, {
                    value     : data.value
                }));

            });

            socket.on('disconnect', function () {

                _Stats.active_connections--;
                log.info(socket.id + ' disconnected. ' + _Stats.active_connections + ' active socket connections.');
                io.to(Room.name).emit('user.destroy', UserDTO(User));
                Room.users.length--;
                log.silly(Room.users.length + " users in " + Room.name);
                delete(Room.users[User.id]);

            });

        });

    }

  }

};
