var walk    = require('walk');
var files   = [];

module.exports = {
    register: function registerHooks(app, server, cb){
        // Walker options
        var walker  = walk.walk('./lib/hooks', { followLinks: false });
        
        walker.on('file', function(root, stat, next) {
            var folder = root.substr(root.indexOf('hooks/')+6);
            
            if(folder != '/hooks'){
                //files.push(root + '/' + stat.name);
                log.debug("Hook:", folder, root );
                try{
                    require('./' + folder).register(app, server, next);
                }catch(err){
                    log.error(err);
                    next();
                }
            }else{
                next();
            }
        });
        
        walker.on('end', function() {
            log.debug("All hooks loaded");
            cb(app);
        });        
    }
};