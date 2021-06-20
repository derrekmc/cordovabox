function AppPlugin(socket, options){

    var usersList = new Array();

    if(!socket) return 'Compatible WebSocket io not passed in. Unable to initialize. Please include socket.io';
    //if(!host) return 'Host not provided. Unable to connect.';
    //if(!token) return 'No token passed for authentication. Unable to authenticate.';

    this.options = options || {};

    application = {
        serverEvents: {
            message             : 'message',
            addUser             : 'user.create',
            removeUser          : 'user.destroy',
            blockUser           : 'user.block'
        },

        roster:{
            userCount: 0
        }

    };

    socket.on('room.create', function (room) {
        options.room.name = room.name;
    });

    socket.on('notification', function (notification) {

        switch(notification.label){

            case 'lowBalance':
                $(options.ui.views.lowBalance).click();
                $(options.ui.lowBalance.videoLowBalMsg).css('display', 'block');
                options.ui.lowBalance.flag = true;
                break;
            case 'addedCredits':
                alert(notification.label, notification.credits);
                break;
            default:
                alert(notification.label);
                break;

        }
    });

    socket.on('room.change', function (data) {
        socket.emit('room.change', {name: options.user.name, room: options.room.slug, id: clientId, type: clientType, token: 'i271az2Z0PMjhd6w0rX019g0iS7c2q4R'});
        $(options.ui.lowBalance.videoLowBalMsg).css('display', 'none');
    });

    socket.on('room.update', function (room) {

        log.info(room);
        options.room.status = room.status;

        switch(room.status){

            case 'private':
                $(options.ui.views.spy).click();
                break;

            case 'freechat':
                $(options.ui.views.freechat).click();
                break;

            case 'tipShow':
                $(options.ui.views.tipShow).click();
                break;

            default:
                break;

        }

        if(room.tips) {
            $(options.ui.tipping.tipLeft).html(room.tips + '/<b>' + room.tipGoal + '</b>');
            $(options.ui.chat.log).prepend('<div class="each-cuc color1 tipped"><span class="ecus-nm"><b class="ico-tip"></b><a href="#"><b class="tipBy">' + room.tipperName + '</b></a><img class="mpic" src="images/t.gif"> has tipped <b>' + room.tipAmount + ' credits</b></span></div>');
        }

        if(room.tipTopic) {
            $(options.ui.tipping.tipTopic).html('<b>' + room.tipTopic + '</b>');
        }

        if(options.ui.lowBalance.flag) {
            $(options.ui.lowBalance.view).html('BALANCE LOW. You have <b>' + room.showTime + '</b> secs left.');
        }

    });

    jQuery(document).ready(function () {
        /**
         * Go Private
         */
        $(options.ui.invokeShow.id).click(function () {
            log.info("info: " + options.user.id + options.room.name);
            $.post("/demo/" + options.room.name + "/" + options.user.name + "/goPrivate", function( data ) {
                if(data.hasOwnProperty('error')){
                    log.error("Cannot start show " + data.error);
                }else{
                    log.info("Change State: Private " + options.user.name  + " " + options.room.name);
                    $(options.ui.invokeShow.view).click();
                    socket.emit('room.change', {name: options.user.name, room: options.room.name + "'s Private Room", id: clientId, type: clientType, token: 'i271az2Z0PMjhd6w0rX019g0iS7c2q4R'});
                }
            })
            .fail(function() {
                alert( "error" );
            })
        });

        /**
         * End Show
         */
        $(options.ui.privateEndShow.id).click(function () {
            log.info("Change State: click");
            $.post("/demo/" + options.room.name + "/" + options.user.name + "/endShow", function( data ) {
                log.info("Change State: Freechat");
                $(options.ui.privateEndShow.view).click();
                log.info(options.room.name);
                socket.emit('room.change', {name: options.user.name, room: options.room.slug, id: clientId, type: clientType, token: 'i271az2Z0PMjhd6w0rX019g0iS7c2q4R'});
            })
            .fail(function() {
                alert( "error" );
            })
        });

        /**
         * Tipping
         */
        $(options.ui.tipMePrivate.id).click(function () {
            var tipAmount = $(options.ui.tipMePrivate.value).val();
            if(!$(options.ui.tipMePrivate.value).val()){
                alert("No tip specified" + tipAmount);
            }else{
                log.info("Tip: click");
                $.post("/demo/" + options.room.name + "/" + options.user.name + "/tip/" + tipAmount, function( data ) {
                    log.info(data);
                    if(data.hasOwnProperty("error")){
                        $(options.ui.tipping.tipError).html(data.error);
                    }
                })
                .fail(function() {
                    alert( "error" );
                })
            }

        });

        var tipAmounts = [2, 5, 10, 20, 25, 30, 40, 50];
        tipAmounts.forEach(function(element){
            log.info(element);
            $(options.ui.tipMePrivate.tipAmount + "_" + element).click(function () {
                $(options.ui.tipMePrivate.value).val($(options.ui.tipMePrivate.tipAmount + "_" + element).html().substr(1));
            });
        });


        socket.emit('app.ready');
    });
}