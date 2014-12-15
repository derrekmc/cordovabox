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
    var name = $('#blockMenu').attr('name');
    $.each(usersList, function(index, result) {
        if(result.name && result.name == name) {
            socket.emit('data', {cmd: 'blockUser', name: name, id: result.id});
        }
    });
}

function findAndRemove(array, property, value) {

}

function doesExist(array, property, value) {
    for (var i=0; i < array.length; i++) {
        if (array[i][property] == value) {
            return true;
        }
    }
    return false;
}

function showBlockMenu(name) {
    $('#blockMenu').attr('name', name.id);
    // position blockMenu next to name
    var distanceFromTop = document.getElementById(name.id).offsetTop;
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
        .html('<div><h6>Block User ' + name.id + '?</h6></div>')
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

    socket.on('user.create', function (data) {
        console.log("Adding user " + data.name + " to roster");
        var user = data.name;
        if (user && !doesExist(usersList, 'name', user) && data.type != clientType.MODEL) {
            var blockLink = '<li><a id='+user+' name='+user+' href="javascript:void(0)" class="blockUserItem" onclick="showBlockMenu('+user+');">'+user+'</a></li>';
            $('#chatUsers').append(blockLink);
            usersList.push({name: user, id: data.id, blocked: false});

        }
    });

    socket.on('user.destroy', function (data) {
        console.log("Removing user " + data.name + " from roster");
        usersList.splice(0, indexOf(data.id));
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