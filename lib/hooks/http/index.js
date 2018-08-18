var walk    = require('walk');
var files   = [];

/**
 * not working
 * @type {{register: module.exports.register}}
 */


module.exports = {
    register: function register(app, server){
        
        app.get('*', function(req, res, next){
            log.debug('Request:', req.path, req.method);
            next();
        });
        
        return;
    }
};