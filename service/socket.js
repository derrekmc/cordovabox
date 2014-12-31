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

    listen: function(io, options) {

        var options = options || {};
        var app = options.app || null;
        var crud = options.crud || null;
        var io = io;
        var self = this;

        io.on('connection', function (socket) {

            _Stats.active_connections++;

            var Query = socket.handshake.query;

            socket.leaveAll();
            socket.join(Query.room);

            /**
             * Map rest point
             * socket.get('/user', function(err, user){
             *      if(!err){
             *      }
             *      User = user;
             * });
             */
            // User.findOne({id: 45}, function(err, user){ if(!err) { log(user.name); }});
            var User = {
                token   : Query.token   || null,
                name    : Query.name    || 'guest', //todo name change
                type    : Query.type    || 1,
                id      : Query.id      || uuid.v4()
            };

            var Room = socket.adapter.rooms[Query.room];
            Room.name = Query.room || 'lobby';

            log.info(socket.id + ' connected. ' + _Stats.active_connections + ' active socket connections.');

            _Stats.active_rooms = socket.adapter.rooms;

            Room.messages   = Room.messages || [];

            Room.users          = Room.users || {};
            Room.users[User.id] = (DataTransmissionObject(User));
            Room.users.length   = Room.users.length || 0;

            Room.users.length++;

            log.silly(Room.users.length + " users in " + Room.name);

            socket.on('ready', function(data){

                log.silly(Room.name + " data syncing with client");

                Room.messages.forEach(function(element){
                    socket.emit('message', DataTransmissionObject(element, {
                        value     : element.value
                    }));
                });

                /**
                 * loops through object and sends the data
                 */
                for(var i in Room.users){
                    var element = Room.users[i];
                    if(element.hasOwnProperty('id') && User.id != element.id){
                        socket.emit('user.create', DataTransmissionObject(element, {
                            value     : element.value
                        }));
                    }
                }

                io.to(Room.name).emit('user.create', DataTransmissionObject(User));

            });

            socket.on('message', function (data) {

                log.silly("("+Room.name+")", User.name, 'said', data.value);

                Room.messages.push(DataTransmissionObject(User, {
                    value     : data.value
                }));

                if(Room.messages.length > 20) Room.messages.pop();

                io.to(Room.name).emit('message', DataTransmissionObject(User, {
                    value     : data.value
                }));

            });

            socket.on('disconnect', function () {

                _Stats.active_connections--;
                log.info(socket.id + ' disconnected. ' + _Stats.active_connections + ' active socket connections.');
                io.to(Room.name).emit('user.destroy', DataTransmissionObject(User));
                Room.users.length--;
                log.silly(Room.users.length + " users in " + Room.name);
                delete(Room.users[User.id]);

            });

        });

    }

  }

};
