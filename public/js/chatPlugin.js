function ChatPlugin(socket, options){

    var usersList = new Array();

    if(!socket) return 'Compatible Socket not passed in. Unable to initialize.';
    //if(!host) return 'Host not provided. Unable to connect.';
    //if(!token) return 'No token passed for authentication. Unable to authenticate.';

    this.options = options || {};

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
                log                 : '#chat_log',
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
        socket.emit(_Config.Chat.Event.message, {
            name: name,
            value: msg
            //type: clientType,
            //id: clientId
        });
        $(options.ui.input).val('');

    }

    var logChat = function  (message, type) {
        var li = $('<li style="list-style-type: none; padding:2px 10px 0px 10px;" >').text(message);
        //li.addClass('clientTypeFont_' + type);
        $(options.ui.log).prepend(li);
        //$(options.ui.log).append(message);

        console.log(options.ui.log,  message, type);
    };

    /**
     *************** Socket Events *****************
     */
    socket.on('connect', function (data) {

        console.log('  --------------   ');
        console.log(" |              |  ");
        console.log(" |  CordovaBox  |  ");
        console.log(" |     .io      |  ");
        console.log(" |              |  ");
        console.log("  --------------   ");

        console.log(" --|= Web socket connect connection established.");

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

    socket.on('user.create', function (data) {
        console.log("Adding user " + data.name + " to roster " + data.id);
        var user = data.name;
        //if (user && !doesExist(usersList, 'name', user) && data.type != clientType.MODEL) {
            var blockLink = '<li style="list-style-type: none; padding:8px;" id='+ data.id +'><a name='+user+' href="javascript:void(0)" class="blockUserItem" onclick="showBlockMenu('+user+');">'+user+'</a></li>';
            $(options.ui.roster).append(blockLink);
            usersList[data.id] = {name: data.name, id: data.id, blocked: false};

        //}
    });

    socket.on('user.destroy', function (data) {
        console.log("Removing user " + data.name + " from roster " + data.id);
        $('#' + data.id).remove();
        delete(usersList[data.id]);
    });

    socket.on('blockUser', function (data) {
        var user = data.name;
        var i = usersList.length;
        while (i--) {
            if (usersList[i].name) {
                if (usersList[i].name == user) {
                    var clientId = usersList[i].id;
                    alert("Blocking user " + user + " with clientId " + data.id);
                    usersList[i].blocked = true;
                    // remove user list element from roster listing
                    $('#'+user).remove();
                    $('.hoverMenu').css("display", 'none');
                }
            }
        }
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