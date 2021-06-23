/**
 * CordovaBox EJS Hook
 */
let ejs = require('ejs');
let path = require('path');
module.exports = {
    register: function register(app, server){
        return new Promise(resolve => {
            // app.set('view engine', 'ejs');
            const rootFolder = path.resolve(`.`) + `/` + ((_Config.site.rootFolder) || 'views');
            app.engine('html', require('ejs').renderFile);
            app.set('view engine', 'ejs');

            app.set('views', rootFolder);

            log.debug('EJS::Folder', rootFolder);

            app.all("*", function (req, res, next){
                var _render = res.render;
                // override logic
                res.render = function( view, options, fn ) {
                    // do some custom logic
                    _.extend( options, {session: true} );
                    ejs.render(view, options);
                    // continue with original render
                    _render.call( this, view, options, fn );
                }
                next();
            });

            resolve();
        });
    }
};
