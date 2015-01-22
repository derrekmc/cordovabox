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

        //if(req.session){
        res.render('room_subscriber.html', {
            socket: req.socket,
            user: req.param('user'),
            room: req.param('name')
        });
        /*}else{
         res.send({
         error: 'Error finding user.'
         });
         }*/

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