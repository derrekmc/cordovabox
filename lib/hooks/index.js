var walk    = require('walk');
var files   = [];

module.exports = {
    register: function registerHooks(app, server, cb){
        // Walker options
        var walker  = walk.walk('./lib/hooks', { followLinks: false });
        
        walker.on('file', function(root, stat, next) {
            var filename = root.substr(root.indexOf('hooks/')+6);
            
            if(filename != '/hooks'){
                //files.push(root + '/' + stat.name);
                log.debug("Hook:", filename, root );
                try{
                    require('./' + filename).register(app, server, next);
                }catch(err){
                    console.error("Hook " + filename + " error:", err);
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