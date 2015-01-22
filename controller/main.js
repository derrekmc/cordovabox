module.exports = {

    exec:  function bootstrap(req, res) {

        res.render('index.html', {
            socket: req.socket,
            user: req.param('user') || 'guest',
            room: req.param('name'),
            title: req.param('title') || "Welcome to CordovaBox.io",
            projectName: _Config.Application.name,
            description: "Chat & Video plugin demo page.",
            author: "Derrek Cordova"
        });

    }

};
