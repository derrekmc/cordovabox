/**
 *
 * @type {{register: register, route: route}}
 */
module.exports = {

    /**
     * Register each route and corresponding controller
     */
    routes: function routes(){

        let routes = require(require("path").resolve(__dirname + "/../config/routes"));
        //log.info("routes", routes);
        var self = this;
        _.each(routes, function (routeObj, route) {
            //this.route(element)
            if(routeObj.method && routeObj.controller){
                log.info("Route::", route, "Method:" + routeObj.method, "Controller:", routeObj.controller);
                self.route(routeObj.method, route, global[routeObj.controller]);
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
     * @param type
     * @param route
     * @param controller
     */

    /**
     * Check policy file here and only react on a callback
     * Check api key on policy file
     * @param type
     * @param route
     * @param controller
     */
    route: function route(type, route, controller) {
    
        log.debug('Setting up route: ' + route);
    
        if(controller && isFunction(controller.exec)){
            this.app[type](route, function(req, res, next){
                /*var routeOut = route.replace(':id', req.param('id'));
                 routeOut = routeOut.replace(':value', req.param('value'));*/
                //log.silly('Accessing route: ' + route, routeOut);
                log.silly('Route: ' + route);
            
                controller.exec(req, res);
            
            });
        }else if(controller) {
            log.silly('Route: ' + route);
            this.app[type](route, controller);
        }else{
            log.error('Controller: ' + controller + ' not found: route "' + route + '"', 'type: ' + type);
        }
    
        /**
         * API keys for routes
         * @type {exports.api|*|exports.api.key}
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
    
