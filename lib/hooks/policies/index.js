var walk    = require('walk');
var files   = [];

/**
 * working
 * @type {{register: module.exports.register}}
 */

module.exports = {
    register: function register(app, server){
        // Walker options
        var httpWalker  = walk.walk('./api/policies/requests', { followLinks: false });
    
        httpWalker.on('file', function(root, stat, next) {
            // Add this file to the list of files
            var name =  stat.name.substr(0, stat.name.indexOf('.js'));
            var file =  stat.name;

            var path = require('path').resolve(root + '/' + file);
            log.info("Http policy:", name);
            //files.push(root + '/' + file);
            app.use(require(path));

            next();
        });
    
        var eventWalker  = walk.walk('./api/policies/events', { followLinks: false });
    
        eventWalker.on('file', function(root, stat, next) {
            // Add this file to the list of files
            var name =  stat.name.substr(0, stat.name.indexOf('.js'));
            var file =  stat.name;
        
            var path = require('path').resolve(root + '/' + file);
            log.info("Event policy:", name);
            //files.push(root + '/' + file);
            app.use(require(path));
        
            next();
        });
    
        // var socketWalker  = walk.walk('./api/policies/sockets', { followLinks: false });
        //
        // socketWalker.on('file', function(root, stat, next) {
        //     // Add this file to the list of files
        //     var name =  stat.name.substr(0, stat.name.indexOf('.js'));
        //     var file =  stat.name;
        //
        //     var path = require('path').resolve(root + '/' + file);
        //     log.info("Socket policy:", name);
        //     //files.push(root + '/' + file);
        //     app.use(require(path));
        //
        //     next();
        // });
        
    }
};