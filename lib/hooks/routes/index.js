/**
 * CordovaBox Routes Hook
 */
module.exports = {
    app: null,
    register: async function register(app) {
        this.app = app;
        await this.routes();
    },
    /**
     * Register each route and corresponding controller
     */
    routes: async function routes(){
        var routes = require(require("path").resolve(__dirname + "/../../../config/routes"));
        var self = this;
        _.each(routes, async function (routeObj) {
            if(routeObj.route && routeObj.method && routeObj.controller){
                log.debug("Route::", routeObj.route, "Method:", routeObj.method, "Controller:", routeObj.controller, "Model:");
                await self.route(routeObj);
            }
        });
    },
    route: async function route({method, route, controller, action, model}) {

        log.debug('Setting up route: ' + route);

        var controllerName = controller;
        var modelName = model;

        controller = global[controllerName];
        model = global[modelName];

        if(action && controller && isFunction(controller[action])){
            this.app[method](route, function(req, res, next){
                log.silly('Route: ' + route, controllerName, action, modelName);
                req.model = model;
                req.modelName = modelName;
                controller[action](req, res, next);
            });
        }else if(controller) {
            log.silly('Route: ' + route, controllerName, modelName);
            this.app[method](route, function(req, res, next) {
                log.silly('Route: ' + route, controllerName, action, modelName);
                req.model = model;
                req.modelName = modelName;
                controller[action || method](req, res);
            });
        }else{
            log.error('Controller: ' + controller + ' not found: route "' + route + '"', 'method: ' + method, 'action: ' + action);
        }

    }
};

