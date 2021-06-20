/**
 * CordovaBox::Policies Hook
 */
var walk    = require('walk');
var files   = [];
module.exports = {
    register: async function register(app, server, cb){
        return new Promise(resolve => {
            // Walker options
            var httpWalker  = walk.walk('./api/policies/httpRequests', { followLinks: false });

            httpWalker.on('file', function(root, stat, next) {
                // Add this file to the list of files
                const name =  stat.name.substr(0, stat.name.indexOf('.js'));
                const file =  stat.name;
                const path = require('path').resolve(root + '/' + file);

                log.silly("Http policy:", name);
                files.push({name, file, path});

                next();
            });

            httpWalker.on('end', async ()=>{
                for(const file of files){
                    await app.use(await require(file.path));
                }
                cb(app);
                resolve();
            });
        });

        // var eventWalker  = walk.walk('./api/policies/events', { followLinks: false });
        //
        // eventWalker.on('file', function(root, stat, next) {
        //     // Add this file to the list of files
        //     var name =  stat.name.substr(0, stat.name.indexOf('.js'));
        //     var file =  stat.name;
        //
        //     var path = require('path').resolve(root + '/' + file);
        //     log.silly("Event policy:", name);
        //     //files.push(root + '/' + file);
        //     app.use(require(path));
        //
        //     next();
        // });

        // var socketWalker  = walk.walk('./api/policies/sockets', { followLinks: false });
        //
        // socketWalker.on('file', function(root, stat, next) {
        //     // Add this file to the list of files
        //     var name =  stat.name.substr(0, stat.name.indexOf('.js'));
        //     var file =  stat.name;
        //
        //     var path = require('path').resolve(root + '/' + file);
        //     log.info("Socket policy:", name);
        //     //files.push(root + '/' + file);
        //     app.use(require(path));
        //
        //     next();
        // });

    }
};
