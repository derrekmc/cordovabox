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
        this.route('get', '/', require('../controllers/main')); // index.html
        this.route('get', '/sitemap', require('../controllers/main')); // index.html

        this.route('post', '/api/stats', require('../controllers/stats'));
        this.route('post', '/user/tip/:id/:value', require('../controllers/user').tip);

        this.route('get', '/room/:name', require('../controllers/room').public);
        this.route('get', '/room/:name/:user', require('../controllers/room').public);

        this.route('get', '/private/:name', require('../controllers/room').private); // might want to add restrictions here
        this.route('get', '/private/:name/:user', require('../controllers/room').private); // might want to add restrictions here

        this.route('get', '/broadcast/:name', require('../controllers/room').broadcast);
        this.route('get', '/broadcast/:name/:user', require('../controllers/room').broadcast);

        this.route('get', '/chat/:name/:user', require('../controllers/room').chat);

        this.route('post', '/auth/jwt/:id/:value', require('../controllers/jwt'));
        this.route('post', '/auth/jwt/secure/:id/:value', require('../controllers/jwt').secure);

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

        log.verbose('Setting up route: ' + route);

        if(controller && isFunction(controller.exec)){
            this.app[type](route, function(req, res){
                /*var routeOut = route.replace(':id', req.param('id'));
                routeOut = routeOut.replace(':value', req.param('value'));*/
                //log.silly('Accessing route: ' + route, routeOut);
                log.verbose('Route: ' + route);
                controller.exec(req, res);
            });
        }else if(controller) {
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
