module.exports = {

    exec:  function bootstrap(req, res) {

        res.render('express_route.html', {
            socket: req.socket,
            user: req.param('user') || 'guest',
            room: req.param('name'),
            title: req.param('title') || "Express Router",
            projectName: _Config.application.name,
            description: "Chat & Video plugin demo page.",
            author: "Derrek Cordova"
        });

    }

};
