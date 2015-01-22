module.exports = {

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
