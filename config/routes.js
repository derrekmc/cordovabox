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
        * Routes
        */
        this.route('get', '/*', require('../policy/isAuthenticated').get);
        this.route('post', '/*', require('../policy/isAuthenticated').post);
         
         
        this.route('post', '/api/stats', require('../controller/stats'));

        this.route('get', '/room/:name', require('../controller/rooms').public);
        this.route('get', '/room/:name/:user', require('../controller/rooms').public);

        this.route('get', '/private/:name', require('../controller/rooms').private);

        this.route('get', '/broadcast/:name', require('../controller/rooms').broadcast);
        this.route('get', '/broadcast/:name/:user', require('../controller/rooms').broadcast);

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

        log.info('Accessing route: ' + route);

        if(controller && isFunction(controller.exec)){
            this.app[type](route, function(req, res){
                controller.exec(req, res);
            });
        }else if(controller) {
            this.app[type](route, controller);
        }else{
            log.error('No corresponding route controller or controller function found for route: ' + route);
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
