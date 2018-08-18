var walk    = require('walk');
var files   = [];
var mongoose = require('mongoose');

/**
 * working
 * @type {{register: module.exports.register}}
 */

module.exports = {
    register: function register(app, server){
        // Walker options
        var walker  = walk.walk('./api/models', { followLinks: false });

        walker.on('file', function(root, stat, next) {
            // Add this file to the list of files
            var name =  stat.name.substr(0, stat.name.indexOf('.js'));
            var file =  stat.name;
                helpers.ucFirst(name);
            //files.push(root + '/' + file);
            var path = require('path').resolve(root + '/' + file);
            log.info("Model:", name);
            //files.push(root + '/' + file);
            var model = require(path).attributes;
            //var methods = ;

            if(model){
                global[name] = new (mongoose.model(name, new mongoose.Schema(model)));
            }else{
                log.warn("No attributes found on " + name + " model cannot register schema");
            }

            next();
        });

        walker.on('end', function() {
            //console.log(files);
            //app.use(require(files[1]));
        });
    }
};