module.exports = {

    exec: function exec(req, res) {

        res.render('room_subscriber.html', {
            //socket: req.socket,
            user: req.param('user') || 'guest',
            room: req.param('room'),
            error: 'Error finding user.'
        });

    },


    public: function public(req, res) {

        res.render('room_subscriber.html', {
            socket: req.socket,
            user: req.param('user') || 'guest',
            room: req.param('name')
        });

    },

    private: function private(req, res) {

        if(req.session && req.session.loggedIn) {
            res.render('room_subscriber.html', {
                socket: req.socket,
                user: req.param('user'),
                room: req.param('name')
            });
        }else{
            require('../controller/main').login(req, res, "User not logged in.");
        }

    },

    broadcast: function broadcast(req, res) {

        res.render('room_broadcaster.html', {
            socket: req.socket,
            user: req.param('user'),
            room: req.param('name')
        });

    },

    chat: function chat(req, res) {

        res.render('chat_video_subscriber.html', {
            socket: req.socket,
            user: req.param('user') || 'guest',
            room: req.param('name'),
            title: "Chat & Video plugin on CordovaBox",
            description: "Chat & Video plugin demo page.",
            author: "Derrek Cordova"
        });

    }

};