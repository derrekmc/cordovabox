module.exports = {
    exec: function exec(req, res) {

        res.render('room.html', {
            //socket: req.socket,
            user: req.param('user') || 'guest',
            room: req.param('room'), //req.socket.user,
            error: 'Error finding user.'
        });

    },


    public: function public(req, res) {

        res.render('room_subscriber.html', {
            socket: req.socket,
            user: req.param('user') || 'guest',
            room: req.param('name') //req.socket.user,
        });

    },

    private: function private(req, res) {

        //if(req.session){
        res.render('room_subscriber.html', {
            socket: req.socket,
            user: req.param('user'),
            room: req.param('name') //req.socket.user,
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
            room: req.param('name') //req.socket.user,
        });

    }
};