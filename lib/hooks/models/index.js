/**
 * CordovaBox Models Hook
 */
var walk    = require('walk');
var files   = [];
var models   = [];
var adapter = require('./waterline');

module.exports = {
    register: async function register(app, server, cb){
        return new Promise(resolve => {
            // Walker options
            var walker = walk.walk('./api/models', {followLinks: false});

            walker.on('file', async function (root, stat, next) {

                const name = helpers.ucFirst(stat.name.substr(0, stat.name.indexOf('.js')));
                const file = stat.name;
                const path = require('path').resolve(root + '/' + file);
                const model = require(path);

                models.push(name.toLowerCase());

                if (model && model.attributes) {
                    log.debug("Model:", name, file);
                    await adapter.model(name, model);
                } else {
                    log.warn("No attributes found on " + name + " model cannot register schema");
                }

                next();
            });

            walker.on('end', function () {
                /**
                 * Add Model CRUD Routes
                 */
                models.forEach(function (model) {

                    ['get', 'post', 'put', 'delete'].forEach(function (action) {

                        const modelName = helpers.ucFirst(model);
                        const controllerName = modelName + 'Controller';

                        const findAllRoute = `/${model}`;
                        app[action](findAllRoute, function (req, res) {
                            req.route = findAllRoute;
                            req.model = model;
                            req.modelName = modelName;
                            global[controllerName][action](req, res)
                        });

                        const findOneRoute = `/${model}/:id`;
                        app[action](findOneRoute, function (req, res) {
                            req.route = findOneRoute;
                            req.model = model;
                            req.modelName = modelName;
                            global[controllerName][action](req, res)
                        });

                    });

                });

                /**
                 * Initialize waterline models
                 */
                adapter.init(models, resolve);


            });
        });
    }
};
