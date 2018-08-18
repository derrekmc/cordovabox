var walk    = require('walk');
var files   = [];

module.exports = {
    register: function registerHooks(app, server){
        // Walker options
        var walker  = walk.walk('./lib/hooks', { followLinks: false });
        
        walker.on('file', function(root, stat, next) {
            var folder = root.substr(root.indexOf('hooks/')+6);
            if(folder != '/hooks'){
                files.push(root + '/' + stat.name);
                try{
                    log.debug("Hook:", folder, root );
                    require('./' + folder).register(app, server);
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
};