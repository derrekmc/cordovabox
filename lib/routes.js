/**
 *
 * @type {{register: register, route: route}}
 */
module.exports = {

    /**
     * Register each route and corresponding controller
     */
    routes: function routes(){
        /**
         * Routes -
         **/
        // this.route('get', '/iac', require('../api/controllers/ExpressRouteController')); // index.html
        // this.route('get', '/', require('../api/controllers/main')); // index.html
        // this.route('get', '/sitemap', require('../api/controllers/main')); // index.html
        //
        // this.route('get', '/api/stats', require('../api/controllers/stats'));
        // this.route('get', '/user/:id', require('../api/controllers/user'));
        // this.route('post', '/user/:id/tip/:value', require('../api/controllers/user').tip);
        //
        // this.route('get', '/room/:name', require('../api/controllers/room').public);
        // this.route('get', '/room/:name/:user', require('../api/controllers/room').public);
        //
        // this.route('get', '/private/:name', require('../api/controllers/room').private); // might want to add restrictions here
        // this.route('get', '/private/:name/:user', require('../api/controllers/room').private); // might want to add restrictions here
        //
        // this.route('get', '/broadcast/:name', require('../api/controllers/room').broadcast);
        // this.route('get', '/broadcast/:name/:user', require('../api/controllers/room').broadcast);
        //
        // this.route('get', '/chat/:name/:user', require('../api/controllers/room').chat);
        //
        // this.route('post', '/auth/jwt/:id/:value', require('../api/controllers/jwt'));
        // this.route('post', '/auth/jwt/secure/:id/:value', require('../api/controllers/jwt').secure);

        var routes = require(require("path").resolve(__dirname + "/../config/routes"));
        //log.info("routes", routes);
        var self = this;
        _.each(routes, function (routeObj, route) {
    
            /**
             * Todo create key reader and just set method based on key
             * Key to find on first " "
             */
    
            var key = route.substr(0, route.indexOf(' '));
            var allowedHeaders = ['get', 'post', 'put', 'delete'];
            
            if(allowedHeaders.indexOf(key) != -1) routeObj.method = key;
            
            log.debug("Route key: ", key);
            
            if(route.indexOf('get') != -1) {
                route = route.substr(3, route.length);
                routeObj.method = "get";
            }
            
            if(route.indexOf('post') != -1) {
                route = route.substr(4, route.length);
                routeObj.method = "post";
            }
            
            if(route.indexOf('put') != -1) {
                route = route.substr(3, route.length);
                routeObj.method = "put";
            }
    
            if(route.indexOf('delete') != -1) {
                route = route.substr(6, route.length);
                routeObj.method = "delete";
            }
            //if(!routeObj.hasOwnProperty('method')) routeObj.method = route.substr(0, 4);
            
            if(routeObj.method && routeObj.controller){
                log.info("Route::", route, "Method:", routeObj.method, "Controller:", routeObj.controller);
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
    
