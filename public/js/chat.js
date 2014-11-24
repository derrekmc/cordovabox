jQuery(document).ready(function () {
    var username = _GET('username');
    var clientId = 0;

    /***
     * Request a user to be blocked
     * @param username
     * @param id
     */
    function sendBlock(username, id) {
        socket.emit('data', {cmd: 'blockUser', username: username, id: id});
        // example:
        // socket.emit('data', {cmd: 'blockUser', username: "Igor", id: 8855});
    }

    /***
     * Request online models to be send back
     *  this fire-and-forget method
     */
    function requestGetOnlineModels() {
        socket.emit('data', {cmd: 'getOnlineModels'});
    }

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

    var log_chat_message = function  (message, type) {
        var li = $('<li />').text(message);
        //alert('clientTypeFont_'+type);
        //li.css('clientTypeFont_' + type);
        li.addClass('clientTypeFont_' + type);
        $('#chat_log').prepend(li);
    };

    socket.on('connect', function (data) {
        log_chat_message('Welcome to Bang Bros Live', 'system');

    });

    socket.on('disconnect', function (data) {
       // log_chat_message(data.message, 'leave');
    });

    socket.on('data', function (data) {
        //log_chat_message(data.cmd, data.type);
        switch(data.cmd){
            case 'addUser':
                //log_chat_message('Welcome to BangBros Live', data.type);
                if (clientId == 0) {
                    clientId = data.id;
                    send({cmd: 'addUser', username: username, type: clientType, id: clientId});
                }

                break;

            case 'removeUser':
                break;

            case 'getOnlineModelsResponse':
                if(console && console.log) {
                    console.log('getOnlineModelsResponse event received.');
                }
                alert(data);
                break;

            case 'sendMessage':
                log_chat_message(data.username + ": " +  data.message, data.type);
                break;
        }

    });

    socket.on('error', function (data) {
        log_chat_message(data.message, 'error');
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