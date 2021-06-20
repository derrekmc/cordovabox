/**
 * CordovaBox Cache Hook
 */
module.exports = {
    register: async function register(app, server, cb){
        app.get('*', function(req, res, next){
            if(_Config.server.noCache) res.setHeader('Last-Modified', (new Date()).toUTCString());
            next();
        });
        cb(app);
    }
};
