var usersList = new Array();
var mouseOverBlockMenu;

function blockUser() {
    var id = $('#blockMenu').attr('name');
    socket.emit('data', {cmd: 'blockUser', username: id, id: id});
}

function removeFromUserList(index) {
    if (usersList[index]) {
        $('#' + usersList[index].username).remove();
        $('.hoverMenu').css("display", 'none');
    }
}

function doesExist(array, property, value) {
    for (var i=0; i < array.length; i++) {
        if (array[i][property] == value) {
            return i;
        }
    }
    return false;
}

function showBlockConfirmation() {
    $('<div></div>').appendTo('#blockMenu')
        .html('<div><h6>Block User?</h6></div>')
        .dialog({
            modal: true, title: 'Chat Block', zIndex: 10000, autoOpen: true,
            width: 'auto', resizable: false,
            buttons: {
                Yes: function () {
                    blockUser();
                    $(this).dialog("close");
                },
                No: function () {
                    //doFunctionForNo();
                    $(this).dialog("close");
                }
            },
            close: function (event, ui) {
                $(this).remove();
            }
        });
}

function showBlockMenu() {
    //$('#blockMenu').attr('name', id);
    // position blockMenu next to username

    $('.hoverMenu').css("display", 'block');
    $('.blockUserItem').mousedown(function(event){
        $('.hoverMenu').css('left', event.pageX);
        $('.hoverMenu').css('top',  event.pageY);
    });
    $('.hoverMenu').mouseover(function(){
        mouseOverBlockMenu = true;
    });
    $('.hoverMenu').mouseleave(function(){
        mouseOverBlockMenu = false;
    });
}

$(document).ready(function () {

    socket.on('data', function (data) {
        var user = "";
        var clientId = "";
        if (data.username) user = data.username;
        if (data.id)  clientId =  data.id;

        switch (data.cmd) {
            // remove user list element from roster listing
            case 'blockUser':
                var userIndex = doesExist(usersList, 'id', clientId);

                if(!userIndex) {
                    removeFromUserList(userIndex);
                    usersList[userIndex].blocked = true;
                }
                //socket.emit('data', {cmd:'removeUser', id:clientId , username:user});

            break;

            //Add user to roster
            case 'addUser':
                if (user && !doesExist(usersList, 'username', user) && data.type != CLIENT_TYPE.BROADCASTER) {
                    $('#blockMenu').attr('name', clientId);
                    var blockLink = '<li><a id='+user+' name='+user+' href="javascript:void(0)" class="blockUserItem" onclick="showBlockMenu();">'+user+'</a></li>';
                    $('#chatUsers').append(blockLink);

                    usersList.push({username: user, id: data.id, blocked: false});
                }
            break;

            //Remove user from roster
            case 'removeUser':
                var userIndex = doesExist(usersList, 'id', data.id);
                removeFromUserList(userIndex);
            break;

            default:
            break;
        }
    });

    $('.chatUsersContainer').mousedown(function(event) {
        if(!mouseOverBlockMenu) $('.hoverMenu').css("display", 'none');
    });

    $('.chatUsersContainer').hover(handlerIn, handlerOut);

    function handlerIn(event) {
        //if(!mouseOverBlockMenu) $('.hoverMenu').css("display", 'none');
    }

    function handlerOut(event) {
        if(!mouseOverBlockMenu) $('.hoverMenu').css("display", 'none');
    }
});