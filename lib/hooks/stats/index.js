var pkg = require('../../../package.json');

/**
 * not working
 * @type {{register: module.exports.register}}
 */

_Config.stats = {
    connections: 0,
    sockets:{},
    views: {},
    version: pkg.version
};

module.exports = {
    register: function register(app, server, cb){

        app.all('*', function(req, res, next){

            if(req.url.indexOf(".") == -1) {
                log.verbose('Route:', req.url, req.method);
                if (!_Config.stats.views[req.path]) {
                    _Config.stats.views[req.path] = {
                        GET: 0,
                        PUT: 0,
                        POST: 0,
                        DELETE: 0
                    }
                }
                _Config.stats.views[req.path][req.method]++;
            }

            next();
        });

        app.get('/stats', function(req, res, next){
            res.send(_Config.stats);
        });

        cb(app);

    }
};
