var walk    = require('walk');
var files   = [];

/**
 * not working
 * @type {{register: module.exports.register}}
 */

var Stats = {
    connections: 0,
    sockets:{},
    views: {}
};

module.exports = {
    register: function register(app, server, next){
    
        /***
         * Cache & https control
         */
        app.get('*', function(req, res, next){

            if(!_Config.server.caching) res.setHeader('Last-Modified', (new Date()).toUTCString());

            if(_Config.server.https && req.headers['x-forwarded-proto']!='https'){
                res.redirect('https://' + req.headers.host.split(":", 1) + req.url)
            }else{
                next(); //Continue to other routes if we're not redirecting
            }

        });

        next();
        
    }
};