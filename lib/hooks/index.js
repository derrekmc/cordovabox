var walk    = require('walk');
var files   = [];

module.exports = {
    register: function registerHooks(app){
        // Walker options
        var walker  = walk.walk('./lib/hooks', { followLinks: false });
        
        walker.on('file', function(root, stat, next) {
            // Add this file to the list of files
            var folder = root.substr(root.indexOf('hooks/')+6)
            if(folder != '/hooks'){
                log.info("Hook:", folder, root );
                //files.push(root + '/' + stat.name);
                try{
                    require('./'+folder).register(app);
                }catch(err){
                    log.error(err);
                }
            }
            next();
        });
        
        walker.on('end', function() {
            //console.log(files);
        });        
    }
}