const walk    = require('walk');
let files = [];

module.exports = {
    register: async function registerHooks(app, server, cb){
        return new Promise(resolve => {
            const walker = walk.walk(__dirname, {followLinks: true});
            walker.on('file', async function (root, stat, next) {
                const filename = root.substr(root.indexOf('hooks'));
                const name = stat.name.substr(0, stat.name.indexOf('.js'));
                const path = require('path').resolve(root);
                const hookName = root.substr(root.indexOf('hooks') + 6);

                if (filename != 'hooks') {
                    /** Only initialize hooks with index.js */
                    if (name === 'index') {
                        files.push({path, hookName, name, filename})
                        next();
                    } else {
                        next();
                    }
                } else {
                    next();
                }
            });

            walker.on('end', async function () {
                files = _.orderBy(files, ['hookName'], ['asc']);
                for (const file of files) {
                    log.debug("Hook::" + file.hookName);
                    try {
                        const hook = require(file.path)
                        await hook.register(app, server, () => {
                            log.silly("hook::loaded")
                        });
                    } catch (err) {
                        console.error("Hook::" + file.hookName + ":error:", err);
                    }
                }
                // cb(app);//passing to each hook instead

                log.debug("All hooks loaded");
                resolve();
            });
        });
    }
};
