/**
 * CordovaBox HTTP/s Hook
 */
module.exports = {
    register: function register(app, server, cb){
        app.all("*", function (req, res, next){
            if(req.url.includes(".html")){
                log.verbose("html request:", req.method, req.url);
            }
            if(_Config.server.https && req.headers['x-forwarded-proto']!='https'){
                res.redirect('https://' + req.headers.host.split(":", 1) + req.url);
            }else{
                next();
            }
        });
        cb(app);
    }
};
