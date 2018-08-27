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
            // Add this file to the list of files
            var name =  stat.name.substr(0, stat.name.indexOf('.js'));
            var file =  stat.name;
            name = helpers.ucFirst(name);
            //files.push(root + '/' + file);
            var path = require('path').resolve(root + '/' + file);
            
            //files.push(root + '/' + file);
            var model = require(path);
    
            
            if(model && model.attributes){
    
                var schema = new mongoose.Schema(model.attributes) ;
                //schema.methods = model.methods;
    
                log.silly("Model:", name);
                
                //log.silly("Model Methods:", model);
                
               
    
                global[name] = mongoose.model(name, schema);
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