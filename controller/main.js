module.exports = {

    /**
     * Required parameters in each controller.
     */
    type: 'get',
    route: '/',
    policy: 'isAuthenticated',

    // Views

    exec:  function bootstrap(req, res) {

        res.render('index.html', {
            socket: req.socket,
            user: req.param('user') || 'guest',
            room: req.param('name'),
            title: req.param('title') || "Welcome to " + _Config.application.name,
            projectName: _Config.application.name,
            description: "Chat & Video plugin demo page.",
            author: "Derrek Cordova"
        });

    },

    login: function(req, res, error){
        var username = req.param('username');
        var password = req.param('password');

        if(username && password){
            log.log(username, password);
        }

        res.render('login.html', {
            title: _Config.application.name + " user login",
            projectName: _Config.application.name,
            description: "Chat & Video plugin demo page.",
            author: _Config.application.author,
            username: username,
            password: password,
            error: function(){
                return (!error ? null: error);
            }
        });
    },

    sitemap: function(req, res){
        res.render('sitemap.html', {
            socket: req.socket,
            user: req.param('user') || 'guest',
            room: req.param('name'),
            title: req.param('title') || _Config.application.name + " sitemap",
            projectName: _Config.application.name,
            description: "Chat & Video plugin demo page.",
            author: _Config.application.author
        });
    }

};
