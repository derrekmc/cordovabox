var walk    = require('walk');
var files   = [];
/**
 * CordovaBox Config Hook
 */
module.exports = {
    register: async function register(app, server, cb){
        return new Promise(resolve => {
            const folderPath = `./config`;
            const walker = walk.walk(folderPath, {followLinks: false});
            walker.on('file', async function (root, stat, next) {
                var name = stat.name.substr(0, stat.name.indexOf('.js'));
                var file = stat.name;
                var path = require('path').resolve(root + '/' + file);
                files.push({ name, file, path });
                next();
            });
            walker.on('end', async function () {
                for(const file of files){
                    log.silly("config:", file.name);
                    global._Config[file.name] = await require(file.path);
                }
                resolve();
            });
        });
    }
};
