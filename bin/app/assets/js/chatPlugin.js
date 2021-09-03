function ChatPlugin(socket, options){

    var usersList = new Array();

    if(!socket) return 'Compatible WebSocket io not passed in. Unable to initialize. Please include socket.io';

    this.options = options || {};

    application = {
        serverEvents: {
            message             : 'message',y
            addUser             : 'user.create',
            removeUser          : 'user.destroy',
            blockUser           : 'user.block'
        },
        roster:{
            userCount: 0
        }

    };

    /***
     * Request a user to be blocked
     * @param name
     * @param id
     */
    function sendBlock(name, id) {
        socket.emit(application.serverEvents.blockUser, {name: name, id: id});
    }

    function sendMessage(msg) {
        if(msg == '') return;
        socket.emit(application.serverEvents.message, {
            name: name,
            value: msg
        });
        $(options.ui.input).val('');

    }

    function messageLog(name, message, type) {
        var li = $('<li style="list-style-type:none; padding:4px 10px 0px 0px;">').html('<span style="font-weight:bold;">' + name + '</span>' + ': ' + message);
        li.addClass('clientTypeFont_' + type);
        $(options.ui.log).prepend(li);
        //$(options.ui.log).append(message);
        log.info(options.ui.log,  message, type);
    }

    /**
     *************** Socket Events *****************
     */
    socket.on('connect', function (data) {
        log.verbose(" --|= Web socket connect connection established.");
    });

    socket.on('disconnect', function (data) {
        messageLog('Disconnect', 'User disconnected from chat', 'leave');
    });

    socket.on('message', function (data) {
        messageLog(data.name, data.value, data.type);
    });

    socket.on('error', function (data) {
        messageLog('Error', data.value, 'error');
    });

    socket.on('room.create', function (data) {
        log.silly('Room create');
        application.roster.userCount = 0;
        $(options.ui.roomTitle).html(data.name);
        $(options.ui.roster).html('');
        $(options.ui.log).html('');
        messageLog('Connected to chat room ', 'system', data);
    });

    socket.on('user.create', function (data) {
        var user = data.name;
        var blockLink = '<li class="roster_item" id='+ data.id +'><a name='+user+' href="javascript:void(0)" onclick="showBlockMenu('+user+');">'+user+'</a></li>';
        $(options.ui.roster).append(blockLink);
        application.roster.userCount++;
        $(options.ui.rosterCount).html(application.roster.userCount + " in room");
    });

    socket.on('user.destroy', function (data) {
        log.info("Removing user " + data.name + " from roster " + data.id);
        application.roster.userCount--;
        $(options.ui.rosterCount).html(application.roster.userCount);
        $('#' + data.id).remove();
        delete(usersList[data.id]);
    });

    jQuery(document).ready(function () {

        $(options.ui.input).keypress(function (event) {
            if (event.which == 13) {
                var msg = $(options.ui.input).val();
                sendMessage(msg);
            }
        });

        $(options.ui.sendInputButton).click(function () {
            var msg = $(options.ui.input).val();
            sendMessage(msg);
        });

        socket.emit('ready', {name: options.user.name, room: options.room.name, id: clientId, type: clientType, token: 'i271az2Z0PMjhd6w0rX019g0iS7c2q4R'});

    });
}
