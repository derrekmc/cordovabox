module.exports = {
    register: function register(app, server, next){    
        app.all("*", function (req, res, next){
            log.debug("http request:", req.method, req.url);             
            if(_Config.server.https && req.headers['x-forwarded-proto']!='https'){
                res.redirect('https://' + req.headers.host.split(":", 1) + req.url);
            }else{
                next();
            }            
        });
        next();        
    }
};