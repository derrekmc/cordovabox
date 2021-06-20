/**
 * CordovaBox Services Hook
 */
var walk    = require('walk');
module.exports = {
    register: function register(app, server, cb){
        return new Promise(resolve => {
            // Walker options
            var walker  = walk.walk('./api/services', { followLinks: false });

            walker.on('file', function(root, stat, next) {
                // Add this file to the list of files
                var name =  stat.name.substr(0, stat.name.indexOf('.js'));
                var file =  stat.name;

                var path = require('path').resolve(root + '/' + file);

                log.silly("Service:", name);
                //files.push(root + '/' + file);
                var serviceName = name + "Service";

                global[serviceName] = require(path);

                next();
            });

            walker.on('end', function() {
                cb(app);
                resolve();
            });
        });

    }
};
