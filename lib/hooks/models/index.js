var walk    = require('walk');
var files   = [];

module.exports = {
    register: function register(app){
        // Walker options
        var walker  = walk.walk('./model', { followLinks: false });
        
        walker.on('file', function(root, stat, next) {
            // Add this file to the list of files
            var file =  stat.name.substr(0, stat.name.indexOf('.js'));
            log.info("Model:", file);
            files.push(root + '/' + file);
            next();
        });
        
        walker.on('end', function() {
            log.info("hook comp");
        });        
    }
}