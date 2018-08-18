var walk    = require('walk');
var files   = [];

/**
 * working
 * @type {{register: module.exports.register}}
 */

module.exports = {
    register: function register(app, server){
        // // Walker options
        // var walker  = walk.walk('./config', { followLinks: false });
        //
        // walker.on('file', function(root, stat, next) {
        //     // Add this file to the list of files
        //     var name =  stat.name.substr(0, stat.name.indexOf('.js'));
        //     var file =  stat.name;
        //
        //     var path = require('path').resolve(root + '/' + file);
        //
        //     log.info("config:", name);
        //     //files.push(root + '/' + file);
        //     var configName = name;
        //
        //     global.serverConfigs[configName] = require(path);
        //
        //
        // });
        //
        // walker.on('end', function() {
        
        //     //console.log(files);
        //     //app.use(require(files[1]));
        // });
    
        return;
    }
};