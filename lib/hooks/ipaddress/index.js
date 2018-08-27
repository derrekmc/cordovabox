var walk    = require('walk');
var files   = [];

/**
 * not working
 * @type {{register: module.exports.register}}
 */


module.exports = {
    register: function register(app, server, next){
    
        if (process.env.NODE_ENV == 'production') {
            app.enable('trust proxy');
        }
    
        app.all("*", function (req, res, next){
            
            var ipAddr = req.headers["x-forwarded-for"];
    
            if (ipAddr){
                var list = ipAddr.split(",");
                ipAddr = list[list.length-1];
            } else {
                ipAddr = req.connection.remoteAddress;
            }
    
            req.session.ipAddress = ipAddr;
            
            log.debug("Requester ip address:", req.session.ipAddress);
            
            next();
        });
    
        
        
        next();
        
    }
};
