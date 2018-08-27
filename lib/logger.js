/**
 * Logging levels pulled from
 * http://en.wikipedia.org/wiki/Syslog#Severity_levels
 */
var winston = require('winston');

var adapter = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(_Config.logger)
    ]
});

var Logger = function Logger(adapter){

    return {
        adapter: adapter || console,

        logIt: function logIt(level, args){
            try{
                this.adapter[arguments.callee.caller.name].apply(this, arguments[0]);
            }catch(err){
                this.adapter.log(arguments.callee.caller.name, arguments[0])
            }

        },

        silly: function silly(){
            this.logIt(arguments);
        },

        verbose: function verbose(){
            this.logIt(arguments);
        },

        debug: function debug(){
            this.logIt(arguments);
        },

        info: function info(){
            this.logIt(arguments);
        },

        log: function log(){
            this.logIt(arguments);
        },

        notice: function notice(){
            this.logIt(arguments);
        },

        warn: function warn(){
            this.logIt(arguments);
        },

        error: function error(){
            this.logIt(arguments);
        },

        critical: function critical(){
            this.logIt(arguments);
        },

        alert: function alert(){
            this.logIt(arguments);
        },

        emergency: function emergency(){
            this.logIt(arguments);
        }

    }

}(adapter);

module.exports = Logger;



