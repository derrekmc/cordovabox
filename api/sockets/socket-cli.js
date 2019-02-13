var uuid = require('uuid');
var UserDTO = require("../models/UserDTO");
var RoomDTO = require("../models/RoomDTO");
var DataTransmissionObject = require("../models/RoomDTO");

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
        //
        var options = options || {};
        var app = options.app || null;
        var crud = options.crud || null;
        var io = io;
        var self = this;
        //
        io.on('connection', function (socket) {

            _Stats.active_connections++;

            log.info(socket.id + ' connected. ' + _Stats.active_connections + ' active socket connections.');

            socket.on('ready', function(data){

                log.silly( " data syncing with client");


            });

            socket.on('message', function (data) {

                log.silly("("+Room.name+")", User.name, 'said', data.value, User.type);

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
