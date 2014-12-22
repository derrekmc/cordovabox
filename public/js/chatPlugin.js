function CordovaBox(host, token, options){

    if(!io) return 'Socket.io not loaded. Cannot initialize.';
    if(!host) return 'Host not provided. Unable to connect.';
    if(!token) return 'No token passed for authentication. Unable to authenticate.';

    this.options = options || {};
    this.options._host = host;
    this.options._token = token;

    var socket = io.connect(host, {query: options});

    _Config = {

        Chat:{
            Event: {
                message             : 'message',
                addUser             : 'user.create',
                removeUser          : 'user.destroy',
                blockUser           : 'user.block'

            },
            UI: {
                name                : '#room_name',
                input               : '#chat_box',
                message_log         : '#chat_log',
                sendInputButton     : '#sendMessageButton',
                userList            : '#roster'
            }
        },

        Video:{
            Event: {
                publishing          : 'publishing',
                status              : 'status',
                name                : 'name'
            },
            UI: {
                name                : '#video_name',
                status              : '#status',
                publishing          : '#publishing'
            }
        }
    };

    /***
     * Request a user to be blocked
     * @param name
     * @param id
     */
    function sendBlock(name, id) {
        socket.emit(_Config.Chat.Event.blockUser, {name: name, id: id});
    }

    function sendMessage(msg) {
        if(msg == '') return;
        socket.emit(_config.chat.event.message, {
            name: name,
            value: msg,
            type: clientType,
            id: clientId
        });
        $(_config.chat.ui.input).val('');
    }

    var logChat = function  (message, type) {
        var li = $('<li />').text(message);
        li.addClass('clientTypeFont_' + type);
        $(_config.chat.ui.message_log).prepend(li);
        console.log(message, type);
    };

    /**
     *************** Socket Events *****************
     */
    socket.on('connect', function (data) {
        logChat('Connected to chat room ', 'system');
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

    jQuery(document).ready(function () {

        $(_config.chat.ui.input).keypress(function (event) {
            if (event.which == 13) {
                var msg = $(_config.chat.ui.input).val();
                sendMessage(msg);
            }
        });

        $(_config.chat.ui.sendInputButton).click(function () {
            var msg = $(_config.chat.ui.input).val();
            sendMessage(msg);
        });

        socket.emit('ready');

    });
}