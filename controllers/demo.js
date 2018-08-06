var sio = require('../service/socket');
var timer = [];

function endShow(req, res) {

    var publicRoom =  req.param('room').substr(0, req.param('room').indexOf("'s Private Room"));
    var privateRoom = req.param('room');

    var Room = sio.io.sockets.adapter.rooms[publicRoom];
    Room.status = 'freechat';

    log.silly('Private timer stopped in room ' + privateRoom);

    clearInterval(timer[privateRoom]);
    delete(timer[privateRoom]);

    User.findOneAndUpdate({username: req.param('username')}, {inPrivate: false}, function(err, model){
        if(!err){
            log.silly('User no longer in private', model._doc.inPrivate)
        }else{
            log.error(err)
        }
    });

    /**
     * Must be previous public room
     */
    log.silly(publicRoom);

    sio.io.to(privateRoom).emit('room.update', RoomDTO(Room))
    sio.io.to(publicRoom).emit('room.update', RoomDTO(Room));
    sio.io.to(privateRoom).emit('room.change', RoomDTO(Room));

}

module.exports = {

    exec: function exec(req, res) {

        res.render('demo/demo/chat.html', {
            socket: req.socket,
            userId: req.param('userId') || 1,
            username: req.param('username') || 'guest',
            room: req.param('room'),
            title: "Chat & Video plugin on CordovaBox",
            description: "Chat & Video plugin demo page.",
            author: "Derrek Cordova"
        });

    },

    broadcast: function broadcast(req, res) {

        res.render('demo/demo/broadcast.html', {
            socket: req.socket,
            userId: req.param('userId') || 1,
            username: req.param('username') || 'guest',
            room: req.param('room'),
            title: "Chat & Video plugin on CordovaBox",
            description: "Chat & Video plugin demo page.",
            author: "Derrek Cordova"
        });

    },

    goPrivate: function goPrivate(req, res) {
        /**
         * Secure room change should happen here not on sockets.js
         */
        User.findOne({username: req.param('username')}).exec(function(err, user){

            if(!err && user){

                log.silly("User:", req.param('username'));

                var publicRoom = req.param('room');
                var privateRoom = req.param('room') + "'s Private Room";

                /**
                 * Get the public and private room objects stored in socket.io
                 */
                var Room = sio.io.sockets.adapter.rooms[publicRoom];
                var PVTRoom = sio.io.sockets.adapter.rooms[privateRoom];

                /**
                 * if user is already in private set the public room to spy mode
                 */
                if(timer[privateRoom]){
                    Room.status = 'spy';
                    sio.io.to(publicRoom).emit('room.update', RoomDTO(Room));
                }else{

                    var price = 5.99;
                    var showTime = Math.round(Math.floor(user.credits / price));
                    /**
                     * If show time/users available credits is greater than or equal to 2 minutes then allow the show to start
                     */
                    if(showTime >= 2) {
                        /**
                         * Start private timer
                         */
                        var privateTimer = function privateTimer() {
                            /**
                             * Set user and room in private
                             */
                            Room.status = 'private';

                            /**
                             * Send the updated socket event to the public room
                             */
                            sio.io.to(publicRoom).emit('room.update', RoomDTO(Room));

                            user.inPrivate = true;

                            user.save(function (err) {
                                if (!err) {
                                    log.silly('user saved', user)
                                } else {
                                    log.error(err)
                                }
                            });

                            function updatePrivateShow() {

                                if (showTime > 0) {
                                    /**
                                     * Decrement the users credits by the price of the show
                                     */
                                    User.findOneAndUpdate({username: req.param('username')}, { $inc: {credits: (price * -1)}}, function (err, model) {
                                        if (!err) {
                                            showTime = Math.round(Math.floor(model._doc.credits / price));
                                            //showTime = (showTime > 0 ? showTime : 0);
                                            log.silly('User credits deducted ' + price + ', balance: ', model._doc.credits);
                                        } else {
                                            log.error('User out of credits ' + err)
                                        }
                                    });

                                    log.silly('Private room(' + privateRoom + ') ' + showTime + "min remaining " + new Date);
                                    PVTRoom = sio.io.sockets.adapter.rooms[privateRoom];

                                    sio.io.to(privateRoom).emit('room.update', RoomDTO(PVTRoom, {
                                        time: new Date,
                                        showTime: showTime
                                    }));

                                    /**
                                     * Send event for 1 minute remaining
                                     */
                                    if (showTime < 2) {
                                        sio.io.to(privateRoom).emit('notification', {
                                            label: 'lowBalance'
                                        });
                                    }

                                }else{
                                    req.params['room'] = req.param('room') + "'s Private Room";
                                    endShow(req, res);
                                }

                            }

                            updatePrivateShow();

                            timer[privateRoom] = setInterval(updatePrivateShow, 1000);

                        }();

                        res.send({room: privateRoom});

                    }else{
                        res.send({error: 'User does not have enough credits to start the show.'});
                    }
                }

            }else{
                res.send({error: "User " + req.param('username') + " not found"});
            }


        });

    },

    endShow: function(req, res){

        User.findOne({username: req.param('username')}, function(err, user){
            res.send({room: req.param('room')});
        });

        endShow(req, res);

    },

    tip: function tip(req, res){
        /**
         * todo find room, find room owner, update that user with the tip and the room with that users tip amount or collection data.
         */
        var tipAmount = req.param('amount');
        User.findOne({username: req.param('username')}).exec(function(err, user){
            if(!err && user && user.canTip(tipAmount)){
                User.findOneAndUpdate({username: req.param('username')}, { $inc: {credits: (tipAmount*-1)}}, function(err, model) {
                    if(!err && model){
                        /**
                         * todo This should be the user of the model. No rooms should exist in the store.
                         */
                        User.findOneAndUpdate({username: req.param('room')}, { $inc: {tips: tipAmount}}, function (err, model) {

                            var publicRoom = req.param('room');
                            var Room = sio.io.sockets.adapter.rooms[publicRoom];

                            if (err) {
                                res.send(err);
                                log.error(err);
                            } else if (model && Room) {

                                Room.tips = model.tips;
                                Room.tipGoal = model.tipGoal;
                                Room.tipTopic = model.tipTopic;

                                if (Room.tips >= Room.tipGoal) Room.status = 'tipShow';

                                sio.io.to(publicRoom).emit('room.update', RoomDTO(Room, {
                                    tipperName: req.param('username'),
                                    tipAmount: req.param('amount')
                                }));

                                res.send({success: true});
                                log.verbose(model._doc.tips);

                            } else {
                                var error = "User " + req.param('room') + " doesn't exist.";
                                res.send({success: false, error: error});
                                log.error(error);
                            }
                        });
                    }else{
                        var error = "Room owner " + req.param('username') + " doesn't exist.";
                        res.send({success: false, error: error});
                        log.error(error);
                    }

                });

            }else{
                var error = "User " + req.param('username') + " doesn't not have enough credits.";
                res.send({success: false, error: error});
                log.error(error);
            }
        });
    },

    addCredits: function addCredits(req, res){
        /**
         * todo find room, find room owner, update that user with the tip and the room with that users tip amount or collection data.
         */
        User.findOneAndUpdate({username: req.param('username')}, { $inc: {credits: req.param('amount')}}, function(err, model){
            if (err) {
                res.send({error: err});
                log.error(err);
            } else if(model){

                var publicRoom = req.param('room');

                sio.io.to(publicRoom).emit('notification', UserDTO(model, {
                    label: 'addedCredits',
                    credits: req.param('amount')
                }));

                res.send({success: true});
                log.verbose(model._doc.credits);

            }else{
                var error = "User " + req.param('username') + " doesn't exist.";
                res.send({success: false, error: error});
                log.verbose(error);
            }
        });
    }

};