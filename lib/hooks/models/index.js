var walk    = require('walk');
var files   = [];
var mongoose = require('mongoose');

/**
 * working
 * @type {{register: module.exports.register}}
 */

module.exports = {
    register: function register(app, server, next){
        // Walker options
        var walker  = walk.walk('./api/models', { followLinks: false });

        walker.on('file', function(root, stat, next) {
            
            var name =  stat.name.substr(0, stat.name.indexOf('.js'));
                name = helpers.ucFirst(name);
            var file =  stat.name;
                //files.push(root + '/' + file);
            var path = require('path').resolve(root + '/' + file);
            
            var model = require(path);
            if(model && model.attributes){
                /**
                 * Start Mongoose Integration
                 * Todo separate this into an ORM/Adapter based approach
                 */
                log.debug("Model:", name);
                var schema = new mongoose.Schema(model.attributes);
                //log.debug("Model Methods:", model);
                //schema.methods = model.methods;
                global[name] = mongoose.model(name, schema);
                /**
                 * EndMongoose Integration
                 */
            }else{
                log.warn("No attributes found on " + name + " model cannot register schema");
            }

            next();
        });

        walker.on('end', function() {
            next();
            //console.log(files);
            //app.use(require(files[1]));
        });
    }
};