var walk    = require('walk');
var files   = [];
var adapter = require('./mongoose');

/**
 * working
 * @type {{register: module.exports.register}}
 */

module.exports = {
    register: function register(app, server, cb){
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
                log.debug("Model:", name, file);
                adapter.model(name, model);
            }else{
                log.warn("No attributes found on " + name + " model cannot register schema");
            }

            next();
        });

        walker.on('end', function() {
            adapter.init()
            cb();
        });
    }
};