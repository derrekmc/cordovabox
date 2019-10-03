/**
 *
 * @method {{register: register, route: route}}
 */
module.exports = {

    /**
     * Register each route and corresponding controller
     */
    routes: function routes(){

        var routes = require(require("path").resolve(__dirname + "/../config/routes"));
        //log.info("routes", routes);
        var self = this;
        _.each(routes, function (routeObj, route) {
    
            /**
             * Add allowed headers to config
             */
            routeObj.route = route.trim();
    
            var parsedMethod = route.substr(0, route.indexOf(' '));
            var parsedRoute = route.substr(route.indexOf(' '), route.length);
            var parsedModel = routeObj.controller.substr(0, routeObj.controller.toLowerCase().indexOf('controller'));
            var allowedHeaders = _Config.http.allowedHeaders || ['get', 'post', 'put', 'delete', 'head'];
            
            if(allowedHeaders.indexOf(parsedMethod) != -1) {
                routeObj.method = parsedMethod.trim();
                routeObj.route = parsedRoute.trim();
                routeObj.model = parsedModel.trim();
                route = parsedRoute.trim();
            }
            
            // log.debug("Route key:", key);
            //
            // if(route.indexOf('get') != -1) {
            //     route = route.substr(3, route.length);
            //     routeObj.method = "get";
            // }
            //
            // if(route.indexOf('post') != -1) {
            //     route = route.substr(4, route.length);
            //     routeObj.method = "post";
            // }
            //
            // if(route.indexOf('put') != -1) {
            //     route = route.substr(3, route.length);
            //     routeObj.method = "put";
            // }
            //
            // if(route.indexOf('delete') != -1) {
            //     route = route.substr(6, route.length);
            //     routeObj.method = "delete";
            // }
            //if(!routeObj.hasOwnProperty('method')) routeObj.method = route.substr(0, 4);
            
            if(routeObj.method && routeObj.controller){
                log.info("Route::", route, "Method:", routeObj.method, "Controller:", routeObj.controller, "Model:", routeObj.model);
                self.route(routeObj.method, routeObj.route, routeObj.controller, routeObj.action, routeObj.model);
            }

        });

    },

    app: null,

    register: function register(app) {
        this.app = app;
        this.routes();

    },

    /**
     *  Create a route with defined requirements and route to the specified controller. API key needed.
     * @param app
     * @param method
     * @param route
     * @param controller
     */

    /**
     * Check policy file here and only react on a callback
     * Check api key on policy file
     * @param method
     * @param route
     * @param controller
     */
    route: function route(method, route, controllerName, action, modelName) {
    
        log.debug('Setting up route: ' + route);
        
        var controller = global[controllerName];
        var model = global[modelName];
    
        if(action && controller && isFunction(controller[action])){
            this.app[method](route, function(req, res, next){
                /*var routeOut = route.replace(':id', req.param('id'));
                 routeOut = routeOut.replace(':value', req.param('value'));*/
                //log.silly('Accessing route: ' + route, routeOut);
                log.silly('Route: ' + route, controllerName, action, modelName);
            
                //controller.exec(req, res);
                req.model = model;
                req.modelName = modelName;
                //console.log("** Model", modelName);
                controller[action](req, res);
            
            });
        }else if(controller) {
            log.silly('Route: ' + route, controllerName, modelName);
            this.app[method](route, function(req, res, next) {
    
                log.silly('Route: ' + route, controllerName, action, modelName);
    
                req.model = model;
                req.modelName = modelName;
    
                controller[method](req, res);
            });
        }else{
            log.error('Controller: ' + controller + ' not found: route "' + route + '"', 'method: ' + method, 'action: ' + action);
        }
    
        /**
         * API keys for routes
         * @method {exports.api|*|exports.api.key}
         */
        /*var apiKey = _Config.api && _Config.api.key;
     
         if (!apiKey) {
         log.warn(route + ' API key not defined in config. Displaying 404 to client. ');
         res.status(401).send({success: 0, message:"No API key found in config."});
         }
     
         if (req.body && req.body.api === apiKey) {
     
         } else {
         log.warn(route + ' An attempt was made on route ' + route + ' invalid api key.');
         res.status(401).send({success: 0});
         }*/
    
    }
};
    
