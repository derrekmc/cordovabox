function ChatPlugin(socket, options){

    var usersList = new Array();

    if(!socket) return 'Compatible WebSocket io not passed in. Unable to initialize. Please include socket.io';

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
            //type: clientType,
            //id: clientId
        });
        $(options.ui.input).val('');

    }

    var logChat = function  (message, type) {
        var li = $('<li style="list-style-type: none; padding:2px 10px 0px 10px;" >').text(message);
        li.addClass('clientTypeFont_' + type);
        $(options.ui.log).prepend(li);
        //$(options.ui.log).append(message);
        console.log(options.ui.log,  message, type);
    };

    /**
     *************** Socket Events *****************
     */
    socket.on('connect', function (data) {
        log.verbose("\n --|= Web socket connect connection established.\n");
        logChat('Connected to chat room ', 'system', data);
    });

    socket.on('disconnect', function (data) {
        logChat(data.value, 'leave');
    });

    socket.on('message', function (data) {
        logChat(data.name + ": " +  data.value, data.type);
    });

    socket.on('error', function (data) {
        logChat(data.value, 'error');
    });

    socket.on('room.create', function (data) {
        $(options.ui.roomTitle).html(data.title);
    });

    socket.on('user.create', function (data) {
        //logChat(data.name + " entered the room", 'error');
        var user = data.name;
        var blockLink = '<li class="roster_item" id='+ data.id +'><a name='+user+' href="javascript:void(0)" onclick="showBlockMenu('+user+');">'+user+'</a></li>';
        $(options.ui.roster).append(blockLink);
        application.roster.userCount++;
        $(options.ui.rosterCount).html(application.roster.userCount + " in room");
    });

    socket.on('user.destroy', function (data) {
        console.log("Removing user " + data.name + " from roster " + data.id);
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

        socket.emit('ready');

    });
}