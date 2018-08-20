var walk    = require('walk');
var files   = [];

/**
 * not working
 * @type {{register: module.exports.register}}
 */

module.exports = {
    register: function register(app, server, cb){
        // Walker options
        var walker  = walk.walk('./api/controllers', { followLinks: false });

        walker.on('file', function(root, stat, next) {
            // Add this file to the list of files
            var name =  stat.name.substr(0, stat.name.indexOf('.js'));
            var file =  stat.name;

            var path = require('path').resolve(root + '/' + file);

            log.info("Controller:", name);
            //files.push(root + '/' + file);
            var controllerName = name + "Controller";

            global[controllerName] = require(path);
    
            next();
        });

        walker.on('end', function() {
            cb();
            //console.log(files);
            //app.use(require(files[1]));
        });
    }
};