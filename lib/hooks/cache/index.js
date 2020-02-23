module.exports = {
    register: function register(app, server, next){
        app.get('*', function(req, res, next){
            if(!_Config.server.caching) res.setHeader('Last-Modified', (new Date()).toUTCString());
            next();
        });
        next();       
    }
};