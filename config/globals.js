if(!global.registeredClass){
    global.registeredClass = true;
    global.Redis = require('node-redis');
    global.User = require('../model/User'); // todo walk the models directory and add any .js files found. For now its just user.
    global.DataTransmissionObject = require('../model/UserDTO'); 
    global._Config = require('./config');
    global.log = require('../config/logger');
    
    global._Stats = {
        active_connections: 0,
        active_users: 0,
        active_guests: 0,
        active_rooms: {}
    };
    
    /**
     * Global function checkers
     */
    global.isFunction = function isFunction(functionToCheck) {
        var getType = {};
        if(functionToCheck) return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    };

    global.requiredFields = function(object, requiredFieldsArray, callback){
        var foundFields = new Array();
        for(var i in object){
            for(var j in requiredFieldsArray){
                if(object[i] == requiredFieldsArray[i]){
                    foundFields.push(requiredFieldsArray[i]);
                }
            }
        }
        if(foundFields.length == requiredFieldsArray.length){
            callback(null, true);
        }else{
            callback("Missing one of the required fields(" + requiredFieldsArray.toString() + ")");
        }
    };

    if(_Config.globals.lodash){
        global._ = require('lodash');
    }

    if(_Config.globals.async){
        global.async = require('async');
    }

    //Array.prototype.forEach = require('../lib/async/forEachNext')

/*
    for(var i in _Cofig.globals){
        var prop = _Cofig.globals[i];
        if(prop){
            global._ = require('lodash');
        }
    }
*/
}
