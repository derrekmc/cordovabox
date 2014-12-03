var usersList = new Array();
var mouseOverBlockMenu;

jQuery.events = function (expr) {
    var rez = [], evo;
    jQuery(expr).each(
    function () {
        if ( evo = jQuery._data( this, "events"))
        rez.push({ element: this, events: evo });
    });
    return rez.length > 0 ? rez : null;
}

function blockUser() {
    var username = $('#blockMenu').attr('name');
    $.each(usersList, function(index, result) {
        if(result.username && result.username == username) {
            socket.emit('data', {cmd: 'blockUser', username: username, id: result.id});
        }
    });
}

function findAndRemove(array, property, value) {

    for (var i=0; i < array.length; i++) {
        //alert(array[i][property] + ' ' + value);
        if (array[i][property] == value) {
            //alert(i);
        }
    }
    return false;
}

function doesExist(array, property, value) {
    for (var i=0; i < array.length; i++) {
        if (array[i][property] == value) {
            return true;
        }
    }
    return false;
}

function showBlockMenu(username) {
    $('#blockMenu').attr('name', username.id);
    // position blockMenu next to username
    var distanceFromTop = document.getElementById(username.id).offsetTop;
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

    $('<div></div>').appendTo('#blockMenu')
        .html('<div><h6>Block User ' + username.id + '?</h6></div>')
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

$(document).ready(function () {

    socket.on('roster.add', function (data) {
        console.log("Adding user " + data.username + " to roster");
        var user = data.username;
        if (user && !doesExist(usersList, 'username', user) && data.type != clientType.MODEL) {
            var blockLink = '<li><a id='+user+' name='+user+' href="javascript:void(0)" class="blockUserItem" onclick="showBlockMenu('+user+');">'+user+'</a></li>';
            $('#chatUsers').append(blockLink);
            usersList.push({username: user, id: data.id, blocked: false});
        }
    });

    socket.on('roster.remove', function (data) {
        var user = data.username;
        console.log("Removing user " + data.username + " from roster");
        findAndRemove(usersList, 'username', user);
    });

    socket.on('blockUser', function (data) {
        var user = data.username;
        var i = usersList.length;
        while (i--) {
            if (usersList[i].username) {
                if (usersList[i].username == user) {
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