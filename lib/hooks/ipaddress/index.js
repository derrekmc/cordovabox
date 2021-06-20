/**
 * CordovaBox IpAddress Tracking Hook
 */
module.exports = {
    register: function register(app, server, cb){

        if (process.env.NODE_ENV == 'production') {
            app.enable('trust proxy');
        }

        app.all("*", function (req, res, next){

            var ipAddr = req.get("x-forwarded-for");

            if (ipAddr){
                var list = ipAddr.split(",");
                ipAddr = list[list.length-1];
            } else {
                ipAddr = req.connection.remoteAddress;
            }

            req.session.ipAddress = ipAddr;

            log.debug("requester ip address:", req.session.ipAddress);

            next();
        });

        cb(app);

    }
};
