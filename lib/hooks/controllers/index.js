var walk    = require('walk');
var files   = [];
/**
 * CordovaBox Controllers Hook
 */
module.exports = {
    register: async function register(app, server, cb) {
        return new Promise(resolve => {
            // Walker options
            log.info(require('path').resolve('./api/controllers'))
            var walker = walk.walk(require('path').resolve('./api/controllers'), {followLinks: false});

            walker.on('file', async function (root, stat, next) {
                // Add this file to the list of files
                var name = stat.name.substr(0, stat.name.indexOf('.js'));
                var file = stat.name;
                var path = require('path').resolve(root + '/' + file);
                var controllerName = helpers.ucFirst(name);

                if (controllerName.toLowerCase().indexOf("controller") == -1) {
                    controllerName += "Controller";
                    log.debug("No controller tag found adding", controllerName);
                }

                log.info("Controller:", controllerName);
                files.push({
                    path, name: controllerName
                });

                log.info("Controller:", controllerName, "Registered");
                next();
            });

            walker.on('end', async function () {
                for (const controller of files) {
                    global[controller.name] = await require(controller.path);
                    for (const action of ['get', 'post', 'put', 'delete']) {
                        if (!global[controller.name][action]) {
                            global[controller.name][action] = await require('./crud')[action];
                        }
                    }
                }
                resolve();
            });

        });
    }
}
