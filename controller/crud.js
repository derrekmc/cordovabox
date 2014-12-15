var config = require("config");
var client = require('../service/redis').client;
var Room = require('../models/room');
var RoomDSA = require('../models/roomDSA');
var Rooms = require('../models/rooms');
var debug = require('../lib/debug');
var forEach = require('../lib/async/asyncForEachNext');

var Adapter = function(namespace, delimeter) {

    var prefix = namespace || "node";
    var delimeter = delimeter || ":";


    /**
     * Create Read Update Destroy
     */
    /***
     * Find a room by its name aka uid/slug
     * callback = a function that will be called upon completion with the following signature = err, roomObject
     */
    Adapter.prototype.read = function (uid, callback) {
        client.hget(uid, function(err, room){
            if(!err && room){
                var room = JSON.parse(room);
                forEach(RoomDSA, function(element, next, done) {
                    Adapter.prototype.getField(uid, element, function(err, value){
                        if(!err && value != null){
                            room[element.fieldName] = value;
                            console.log(uid + " field " + element.fieldName + " found in redis");
                        }else{
                            //console.log(uid + " field " + element.fieldName + " not found in redis", debug.lvl.REDIS);
                        }
                        next();
                    });
                }, function(err, result){
                    if(callback) callback(null, room);
                });
            }else{
                if (callback) {
                    callback({message: "Error room(" + uid + ") not found"}, null);
                }
            }
        });
    };

    Adapter.prototype.findByKey = function(key, value, callback){

        client.lrange("users", 0, -1, function(err, list) {

            if(err) {
                callback(err);
            } else {
                if(list.length > 0){
                    forEach(list, function(element, next, done) { // todo watch for error
                        Adapter.prototype.get(element, function(err, room){
                            if(!err) {
                                if(room[key] == value){
                                    done(null, room);
                                }
                            }
                            next();
                        });
                    }, callback);

                }else{
                    var err  = {message: "findByKey: No list returned."};
                    if(callback) callback(err, null);
                }

            }
        });
    };

    /**
     * @param userObjectPropertiesToSave The properties on the user object that you would like to save.
     * In this example I save 2 this.save({id:"123", name:"Derrek"});
     * @param callback
     */
    Adapter.prototype.save = function (uid, attributesToSaveObject, callback) {
        var object = {};
        for (var key in attributesToSaveObject) {
            Adapter.prototype.setField(uid, attributesToSaveObject[key], function(err, response){
                if(err) {
                    if(callback) callback(err);
                }else{
                    console.log(response);
                }
            });
        }
    };

    /***
     * Increment a key in the prefix store by the given value
     * callback = a function that will be called upon completion with the following signature = err, roomObject
     */
    Adapter.prototype.incrementFieldBy = function (uid, key, value, callback) {
        var storeKey = prefix + delimeter + uid;
        client.hincrby(storeKey, key, value, function(err, value){
            if(!err && response != null){
                if (callback) callback(err, value);
            }else{
                if (callback) callback({message: "Error cannot save key room." + key + " to " + value + "."}, null);
            }
        });
    };

    /***
     * Decrement a key in the prefix store by the given value
     * callback = a function that will be called upon completion with the following signature = err, roomObject
     */
    Adapter.prototype.decrementFieldBy = function (uid, key, value, callback) {
        var storeKey = prefix + delimeter + uid;
        value *= -1;
        client.hincrby(storeKey, key, value, function(err, value){
            if(!err && value != null){
                if (callback) callback(err, value);
            }else{
                if (callback) callback({message: "Error cannot set field. " + key + " to " + value + "."}, null);
            }
        });
    };

    /***
     * Save the key to the store
     * callback = a function that will be called upon completion with the following signature = err, roomObject
     */
    Adapter.prototype.setField = function (uid, field, value, callback) {
       var storeKey = prefix + delimeter + uid;
        client.hset(storeKey, key, value, function(err, response){
            if(!err && response != null){
                if (callback) callback(err, value);
            }else{
                if (callback) callback({message: "Error cannot save key room." + key + " to " + value + "."}, null);
            }
        });
    };

    /***
     * Get the key from the store
     * callback = a function that will be called upon completion with the following signature = err, roomObject
     */
    Adapter.prototype.getField = function (uid, field, callback) {
        var storeKey = prefix + delimeter + uid;
        client.hget(storeKey, key, function(err, value){
            if(!err && value != null){
                if (callback) callback(err, value);
            }else{
                if (callback) callback({message: "Error room." + key + " not found"}, null);
            }
        });
    };

    /***
     * Create a room
     */
    Adapter.prototype.create = function (roomObj, callback) {
        var error = {message: "Cannot create room " + roomObj.uid + " room already exists."};

        if (typeof roomObj === 'object') {
            Adapter.prototype.findOne(roomObj.uid, function (err, room) {
                if (err) {
                    var newRoom = Room(roomObj);
                    client.hset(newRoom.uid, newRoom, function(err, reponse){
                        callback(err, newRoom);
                    });
                } else {
                    callback(error, room);
                }
            });
        } else {
            var err = {message: "roomObj must be an object. Cannot create room." + roomObj};
            callback(err, null);
        }

    };

    Adapter.prototype.destroy = function(uid, callback){
        var errorMessage = {message: uid + " could not be found."};
        client.del(uid, function(err, response){
            if(!err){
                if(callback) callback(null, uid);
            }else{
                if(callback) callback(errorMessage, uid);
            }
        });

    };

    /***
     * get an array of all adapter.rooms
     * callback = function that will be called upon completion with the following signature = err, listOfObjects
     */
    Adapter.prototype.getList = function(setName, callback){
        client.lrange(setName, 0, -1, function(err, list) {
            if(err) {
                callback(err);
            } else {
                if(list.length > 0){
                    var listOfRooms = [];
                    Adapter.prototype.rooms = list;
                    forEach(list, function(element, next, done){
                        Adapter.prototype.get(element, function(err, room){
                            if(!err) {
                                listOfRooms.push(room);
                            }
                            next();
                        })
                    }, function(){
                        callback(null, listOfRooms);
                    });
                }else{
                    var err  = {message: "No rooms found."};
                    callback(err, null);
                }

            }
        });
    };

};

module.exports = new Adapter();
