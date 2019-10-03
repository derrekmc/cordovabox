module.exports = {
    register: function register(app, server, next){
    
        app.all("*", function (req, res, next){
            log.debug("http request:", req.method, req.url);
            next();
        });
        
        next();
        
    }
};