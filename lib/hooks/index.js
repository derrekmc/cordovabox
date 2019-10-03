var walk    = require('walk');
var files   = [];

module.exports = {
    register: function registerHooks(app, server, cb){
        // Walker options
        var walker  = walk.walk(__dirname, { followLinks: false });
        
        walker.on('file', async function(root, stat, next) {

            var filename = root.substr(root.indexOf('hooks'));
            var name =  stat.name.substr(0, stat.name.indexOf('.js'));
            var hookName =  root.substr(root.indexOf('hooks')+6);
            var path = require('path').resolve(root);

            if(filename != 'hooks'){
                log.debug("Hook::" + hookName);
                try{
                    /**
                     * Only initialize hooks with index.js
                     */
                    if(name === 'index') {
                        await require(path).register(app, server, next);
                    }else{
                        next();
                    }
                }catch(err){
                    console.error("Hook::" + hookName + ":error:", err);
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