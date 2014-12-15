
    var name = _GET('displayName');
    var clientId = 0;

    var uiContainers = {
        name     : '#room_name',
        input    : '#chat_box',
        messages : '#chat_log',
        users    : '#roster'
    };

    /***
     * Request a user to be blocked
     * @param name
     * @param id
     */
    function sendBlock(name, id) {
        socket.emit('user.block', {name: name, id: id});
        // example:
        // socket.emit('data', {cmd: 'blockUser', name: "Igor", id: 8855});
    }

    function sendMessage(msg) {
        if(msg == '') return;
        socket.emit('message', {
            name: name,
            value: msg,
            type: clientType,
            id: clientId
        });
        $(uiContainers.input).val('');
    }

    function send(data) {
        if(data == '') return;
        console.error(data);
        socket.emit('data', data);
        $(uiContainers.input).val('');
    }

    var logChat = function  (message, type) {

        var li = $('<li />').text(message);
        li.addClass('clientTypeFont_' + type);
        $(uiContainers.messages).prepend(li);
        console.log(message, type);
    };

    /**
     *************** Socket Events *****************
     */
    socket.on('connect', function (data) {
        logChat('Welcome to Bang Bros Live', 'system');
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

    $(uiContainers.input).keypress(function (event) {
        if (event.which == 13) {
            var msg = $(uiContainers.input).val();
            sendMessage(msg);
        }
    });

    $('#sendMessageButton').click(function () {
        var msg = $(uiContainers.input).val();
        sendMessage(msg);
    });

});