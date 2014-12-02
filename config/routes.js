var debug = require('../lib/debug');
var config = require('config');

/**
 *
 * @type {{register: register, route: route}}
 */
module.exports = {

    /**
     * Register each route and corresponding controller
     */
    routes: function(){

        /**
         * Route to healthCheckController
         */
        this.route('post', '/api/stats', require('../controller/stats'));
        this.route('get', '/room/:name', require('../controller/room'));

    },







































    app: null,

    register: function(app, io) {
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
    route: function(type, route, controller) {
        this.app[type](route, function (req, res) {
            debug.silly('Accessing route: ' + route);
            var apiKey = config.api && config.api.key;
            if (!apiKey) {
                debug.error(route + ' API key not defined in config. Displaying 404 to client. ');
                res.status(401).send({success: 0, message:"No API key found in config."});
            } else {
                if (req.body && req.body.api === apiKey) {
                    controller.exec(req, res);
                } else {
                    debug.warn(route + ' An attempt was made on route ' + route + ' invalid api key.');
                    res.status(401).send({success: 0});
                }
            }
        });
    }
};
