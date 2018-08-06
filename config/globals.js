if(!global.registeredClass){

    global.registeredClass = true;
    global._Config = require('./config');
    global.log = require('../config/logger');

    global._Stats = {
        active_connections: 0,
        active_users: 0,
        active_guests: 0,
        active_rooms: {},
        status: 'online',
        conversions: 0
    };

    if(_Config.globals.lodash){
        global._ = require('lodash');
    }

    if(_Config.globals.async){
        global.async = require('async');
    }

    global.queryStringToJSON = function queryStringToJSON(url) {
        if (!url || url == '')
            return false;
        //var pairs = (url).slice(1).split('&');

        var pairs = (url).split('&');
        var result = {};
        for (var idx in pairs) {
            var pair = pairs[idx].split('=');
            if (!!pair[0])
                result[pair[0].toLowerCase()] = decodeURIComponent(pair[1] || '');
        }

        return result;
    }

    /**
     * Global function checker
     */
    global.isFunction = function isFunction(functionToCheck) {
        var getType = {};
        if(functionToCheck) return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    };

    global.isArray = function isArray(arrayToCheck) {
        var getType = {};
        if(arrayToCheck) return arrayToCheck && getType.toString.call(arrayToCheck) === '[object Array]';
    };

    global.requiredFields = function requiredFields(object, requiredFieldsArray, callback){
        if(!callback) callback = function(){};
        if(isArray(requiredFieldsArray)) {
            var foundFields = new Array();
            for(var i in object){
                for(var j in requiredFieldsArray){
                    if(i == requiredFieldsArray[j]){
                        foundFields.push(requiredFieldsArray[j]);
                    }
                }
            }
            if(foundFields.length == requiredFieldsArray.length){
                callback(null);
                return null;
            }else{
                //var diff = _.difference(object, requiredFieldsArray);
                var error = "Missing one of the required fields(" + requiredFieldsArray.toString() + ")\n Fields Found: (" + foundFields.toString() + ")";
                callback(error);
                return error;
            }
        }else{
            var error = "requireFields param 2 is not an Array";
            callback(error);
            return error;
        }

    };

    global.objectValue = function valueFromObject(object, field){
        if(object){
            if(object.hasOwnProperty(field)){
                return object[field];
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

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

    global.forEachNext = require('../lib/async/forEachNext');

    if(_Config.server.cluster) global.Redis = require('../service/redis');

    global.Promise = require("bluebird");

    global.mongoose = require('mongoose');

    global.mongodb = new require('../services/mongo');

    global.User = new require('../models/User'); // todo walk the models directory and add any .js files found. For now its just user.

    global.Mail = new require('../models/Mail');
    global.Transaction = new require('../models/Transaction');
    global.Event = new require('../models/Event');

    global.UserDTO = require('../models/UserDTO');
    global.RoomDTO = require('../models/RoomDTO');

    global.request = require("request");

    global.hipchat = require("node-hipchat");

    global.moment = require('moment-timezone');

    //global._MongoConnection

    function capitalize(str){
        var words = str.split(" ");
        for (var i=0 ; i < words.length ; i++){
            var testwd = words[i];
            var firLet = testwd.substr(0,1);
            var rest = testwd.substr(1, testwd.length -1)
            words[i] = firLet.toUpperCase() + rest
        }
        return words.join(" ");
    }

    global.capitalize = capitalize;

    global.autoEmailInterval = [];
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
