var walk    = require('walk');
var files   = [];

/**
 * working
 * @type {{register: module.exports.register}}
 */


module.exports = {
    register: function register(app, server){
        
        var walker  = walk.walk('./config', { followLinks: false });
            walker.on('file', function(root, stat, next) {
                var name =  stat.name.substr(0, stat.name.indexOf('.js'));
                var file =  stat.name;
                var path = require('path').resolve(root + '/' + file);
    
                log.info("config:", name);
                var configName = name;
                global._Config[configName] = require(path);
                next();
            });
        
            walker.on('end', function() {
            });
    
        return;
    }
};