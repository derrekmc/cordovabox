if(!global.registeredClass){
    global.registeredClass = true;

    global.User = new require('../model/User'); // todo walk the models directory and add any .js files found. For now its just user.
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

    global.Dictionary = function Dictionary(name){

        this.length = 0;
        this.name = name;
        this.dict = new Array();

        Dictionary.prototype.add = function(key, value){
            this.dict[key] = value;
            this.length++;
        };

        Dictionary.prototype.remove = function(key){
            this.dict[key] = value;
            this.length--;
        };

        Dictionary.prototype.findOne = function(key, value, callback){
            var dictionary = this.dict[key] = value;
            for(var i in dictionary){
                var element = dictionary[i];
                log.silly(element);
                if(element.hasOwnProperty(element.id) && dictionary[i] == element.id){
                    callback(value);
                }
            }
        };

        //Additional supported short cuts
        Dictionary.prototype.del = Dictionary.prototype.remove;

    };

    //global.forEach = require('../lib/async/forEachNext');

    if(_Config.globals.lodash){
        global._ = require('lodash');
    }

    if(_Config.globals.async){
        global.async = require('async');
    }

    global.Redis = require('../service/redis');

    global.Promise = require("bluebird");

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
