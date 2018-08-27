module.exports = {
    register: function register(app, server, next){
    
        app.all("*", function (req, res, next){
            log.debug("Http request:", req.url);
            next();
        });
        
        next();
        
    }
};