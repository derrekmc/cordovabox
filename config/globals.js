if(!global.registeredClass){
    global.registeredClass = true;
    global.Redis = require('node-redis');
    global.User = require('../model/user'); // todo walk the models directory and add any .js files found. For now its just user.
    global._Config = require('./config');
    global.log = require('../config/logger');
    global.isFunction = function isFunction(functionToCheck) {
        var getType = {};
        if(functionToCheck) return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    };
    global._Stats = {
        active_connections: 0,
        active_users: 0,
        active_guests: 0,
        active_rooms: {}
    };
}
