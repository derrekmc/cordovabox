function _GET(parameter){
    return getUrlParameters(parameter, '',  true);
}

function getUrlParameters(parameter, staticURL, decode){

   if(window.location.search.indexOf(parameter) == -1) return false;
   
   var currLocation = (staticURL.length)? staticURL : window.location.search,
       parArr = currLocation.split("?")[1].split("&"),
       returnBool = true;
   
   for(var i = 0; i < parArr.length; i++){
        parr = parArr[i].split("=");
        if(parr[0] == parameter){
            return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            returnBool = true;
        }else{
            returnBool = false;            
        }
   }
   
   if(!returnBool) return false;  
}

function stretchH(objId, offSet) {
    var value = ((document.body.offsetWidth)*9/16);
    value += offSet;
    $(objId).css('height', value+"px");
}

function stretchW(objId, offSet) {
    var value = ((document.body.offsetWidth));
    value += offSet;
    $(objId).css('width', value+"px");
}

function resize() {
    var playerHeight = ((document.body.offsetWidth) * (9/16));
    centerOnScreen("play_button", 0, 0);
    centerOnScreen("load_overlay", -50, -50);

    $('html, body').animate({scrollTop: '0px'}, 300);
    stretchW("#chat_box", -80);
    stretchH("#video_player");
    stretchH("#hls");
    stretchH("#model_overlay");

    //stretch("model_overlay");
}


function stretchHOnDiv(childDivId, parentDivId, offSetY) {

    if(!childDivId){
        jnt.log("No Child Div Id " + childDivId);
        return;
    }

    if(!parentDivId){
        jnt.log("No Parent Div Id " + parentDivId);
        return;
    }

    offSetY = offSetY || 0;

    var parentDivObj = document.getElementById(parentDivId);
    var childDivObj = document.getElementById(childDivId);

    if(!childDivObj){
        jnt.log("No Child Div Obj " + childDivId);
        return;
    }

    if(!parentDivObj){
        jnt.log("No Parent Div Obj " + parentDivId);
        return;
    }

    var newHeight = parentDivObj.offsetHeight; //(divObj.offsetWidth * (9/16));
    newHeight += offSetY;

    if (childDivObj) {
        //obj.style.marginLeft = (divObj.offsetWidth / 2 - obj.offsetWidth / 2 ) + offSetX + 'px';
        //childDivObj.style.marginTop = ((newHeight / 2) - (childDivObj.offsetHeight / 2) ) + offSetY + 'px';
        childDivObj.style.height =  newHeight+'px';
        //childDivObj.offsetHeight =  newHeight + 'px';
        //jnt.log("Resizing Child Height: " + childDivObj.offsetHeight);
    }
}

function centerOnScreen(objId, offSetX, offSetY) {
    var playerHeight = (document.body.offsetWidth * (9/16));
    var obj = document.getElementById(objId);
    if (obj) {
        obj.style.marginLeft = (document.body.offsetWidth / 2 - obj.offsetWidth / 2 ) + offSetX + 'px';
        obj.style.marginTop = ((playerHeight / 2) - (obj.offsetHeight / 2) ) + offSetY + 'px';
    }
}

function cache() {
    return Math.round(Math.random()*2023);
}