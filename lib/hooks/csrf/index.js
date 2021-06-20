/**
 * CordovaBox Cross Site Forgery Request Hook
 */
function parseCookies (request) {
    var list = {}, rc = request.headers.cookie;
    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return list;
}
module.exports = {
    register: async function register(app, server, cb){
        return new Promise(resolve => {
            var csrf = require('csurf');
            var bodyParser  = require('body-parser');
            var csrfProtection = csrf({ cookie: true });

            if(_Config.http.csrf){

                var parseForm = bodyParser.urlencoded({ extended: false })
                app.use(bodyParser.urlencoded({ extended: false }));

                app.get('*', csrfProtection, function (req, res, next) {
                    var token = req.csrfToken();
                    res.cookie('XSRF-TOKEN', req.csrfToken())
                    next();
                })

                app.post('*', parseForm, csrfProtection, function (req, res,next) {
                    next();
                })

                app.get('/csrf', csrfProtection, function (req, res, next) {
                    const cookies = parseCookies(req)
                    res.send({"csrf":cookies['XSRF-TOKEN'], enabled:true});
                })

            }else{
                app.get('/csrf', csrfProtection, function (req, res, next) {
                    res.send({"csrf":"", enabled:false});
                });
            }

            cb(app);
            resolve();
        });
    }
};
