jQuery(document).ready(function () {
    var username = _GET('displayName');
    var clientId = 0;

    /***
     * Request a user to be blocked
     * @param username
     * @param id
     // example:
     // socket.emit('data', {cmd: 'blockUser', username: "Igor", id: 8855});
     */
    function sendBlock(username, id) {
        socket.emit('data', {cmd: 'blockUser', username: username, id: id});
    }

    /***
     * Request online models to be send back
     *  this fire-and-forget method
     */


    function sendMessage(msg) {
        if(msg == '') return;
        socket.emit('data', {cmd: 'sendMessage', username: username, message: msg, type: clientType, id: clientId});
        $('#chat_box').val('');
    }

    function send(data) {
        if(data == '') return;
        socket.emit('data', data);
        $('#chat_box').val('');
    }

    var log_chat_message = function (message, type, userId) {

        var blocked = false;

        try{
            if (userId) {
                if (doesExist(usersList, 'id', userId)) {
                    blocked = usersList[doesExist(usersList, 'id', userId)].blocked;
                }
            }
        }catch(e){
            $('#chat_log').prepend(e);
        }


        // don't add chat message if user is blocked
        if (!blocked) {

            var li = $('<li />').text(message);
            //alert('clientTypeFont_'+type);
            //li.css('clientTypeFont_' + type);
            li.addClass('clientTypeFont_' + type);
            $('#chat_log').prepend(li);
        }
    };

    socket.on('connect', function (data) {
        log_chat_message('Welcome to BangBros Live', 'system', null);
    });

    socket.on('disconnect', function (data) {
       // log_chat_message(data.message, 'leave', null);
        socket.emit('data', {cmd: 'removeUser', id: data.id, username: data.username, message: 'User left.'});
    });

    socket.on('data', function (data) {
        //log_chat_message(data.cmd, data.type, null);
        switch(data.cmd){
            case 'addUser':
                if (clientId == 0) {
                    clientId = data.id;
                    send({cmd: 'addUser', username: username, type: clientType, id: clientId});
                }
                break;

            case 'sendMessage':
                log_chat_message(data.username + ": " + data.message, data.type, data.id);
                break;
            default:
                break;
        }

    });

    socket.on('error', function (data) {
        log_chat_message(data.message, 'error', null);
    });

    $('#chat_box').keypress(function (event) {

        if (event.which == 13) {
            var msg = $('#chat_box').val();
            sendMessage(msg);
        }
    });

    $('#sendMessageButton').click(function () {
        var msg = $('#chat_box').val();
        sendMessage(msg);
    });
});