/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
var orientationLayout = '';
var streamSrc = '';
var streamType = 'hd';

function ajaxCall(filename, dataString, callBackFunction, method){		
	if(!dataString) dataString ='';
	if(!method) method ='GET';
	$.ajax({  	
		type: method,  
		url: filename,  
		data: dataString,  
		success: function(data) { 
			if(!callBackFunction){
				return data;
			}else{
			 	callBackFunction(data); // callback(data);				  
			}
		}  
	});		
}

$('#player').on('swipeleft', function(e) {
  alert("swipleft"); // Next Model
})
$('#player').on('swiperight', function(e) {
  alert("swipright"); // Previous model/browser go back or exit.
});

function onError(e) {
    // video playback failed - show a message saying why
    switch (e.target.error.code) {
        case e.target.error.MEDIA_ERR_ABORTED:
           // alert('You aborted the video playback.');
            break;
        case e.target.error.MEDIA_ERR_NETWORK:
            //alert('A network error caused the video download to fail part-way.');
            break;
        case e.target.error.MEDIA_ERR_DECODE:
           // alert('Connection unstable attempting to reconnect.');
            //window.setTimeout(play(), 20000);

        case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            //setOverlay('offline');
            //setOverlay('error');
            //alert('The video could not be loaded, either because the server or network failed or because the format is not supported by your browser. Supported browsers are Safari and Chrome.');
            break;

        default:
            alert('An unknown error occurred.');
            setOverlay('offline');
            break;
    }
    var evt = e ? e:window.event;
    if (evt.preventDefault) evt.preventDefault();
    evt.returnValue = false;
    return false;
}
		  
var haveShownPlay = new Boolean(false);
var havePressedPlay = new Boolean(false);

function onPlay(e) {
  
 //document.getElementById('hls').play();
 //document.getElementById('play_button').style.display = "none";
 $("#play_button").fadeOut("slow");
 //document.getElementById('load_overlay').style.display = "none";
 //document.getElementById('model_overlay').style.display = "none";
 $("#model_overlay").fadeOut("slow");
 $("#load_overlay").fadeOut("slow");

}			  

function play(){
	
	 if(havePressedPlay == true){
		  document.getElementById('hls').play();
		//document.getElementById('play_button').style.display = "none";
		  $("#play_button").fadeOut("slow");
		//document.getElementById('load_overlay').style.display = "block";
		  $("#load_overlay").fadeIn("slow");
	 }			
}
			


function onLoadStart(e) {
 	if(haveShownPlay == false){
		haveShownPlay = true;		  
		
		$("#play_button").fadeIn("slow");
		resizeVideo();
		
		/*var vidUrl='http://kh-fms-edge5-1.isprime.com:1935/broadcast/afternoondelight/mp4:afternoondelight_'+streamType+'/playlist.m3u8';
		var myVideo = document.getElementById('hls');
		myVideo.src = vidURL;
		myVideo.load();
		myVideo.play();*/
		//document.getElementById('play_button').style.display = "block";
	}
}

function resizeVideo(){
	var playerHeight = ((document.body.offsetWidth) * (9/16));
	centerOnScreen("play_button", 0, 0);
	centerOnScreen("load_overlay", -50, -50);
	
	$('html, body').animate({scrollTop: '0px'}, 300);

	stretchH("#video_player");
	stretchH("#hls");
	stretchH("#model_overlay");

	//stretch("model_overlay");
}

var intTime = new Date().getTime();
var getTime = function() {
    var intNow = new Date().getTime();
    if (intNow - intTime > 1000) {
        //console.log("I JUST WOKE UP");
        if(haveShownPlay == true){
            play();
            $("#load_overlay").fadeOut("slow");
        }

        //alert("I JUST WOKE UP " + (intNow - intTime) + " " + intNow + " " + intTime);
    }
    intTime = intNow;
    setTimeout(getTime,500);
};
getTime();

function onPressedPlay(){
 havePressedPlay = true;
 play();
}
  
function overlay(){
	
}

  function goPrivate(){
	
}

function onOrientationChange()
{
	switch(window.orientation) 
	{  
	  case -90:
          alert('portrait');
          orientationLayout = 'portrait';
            break;
	  case 90:
          alert('landscape');
		    orientationLayout = 'landscape';
		break; 
		
		default:
		//orientationLayout = 'portrait';
		//alert('portrait');
		resizeVideo();
		break; 
	}
}


function setOverlay(overlay){

    $('.playerOverlay').hide();
	
    overlay = overlay.toLowerCase();
    
	switch (overlay){
		
		default:
			 $('#video-overlay-modelimage').show();
            break
		case 'away':
            $('#video-overlay-away').show();
            break
       case 'error':
            $('#video-overlay-error').show();
            break
       case 'offline':
            $('#video-overlay-offline').show();
            break
		case 'private':       		
		case 'spy':
            $('#video-overlay-private').show();
            break
    	}

}
	
  window.addEventListener('orientationchange', onOrientationChange);
  window.addEventListener('resize', resizeVideo);
  function dimBack() {
    this.removeEventListener('play', dimBack, false);
    onPlay();
  }
  window.onload = function(){
	//var deviceType = 'computer';

	var dataString = '';
	var filename = 'detect.php';
	/*$.ajax({
			type: "GET",  
			url: filename,  
			data: dataString,  
			success: function(data) {

			deviceType = data;
	
			  switch(deviceType){
				  default:
				  case "computer":
					  streamType = 'hd';
				  break;
				  case "tablet":
					  streamType = 'tablet';
				  break;
				  case "phone":
					streamType = 'mobile';
				  break;
			  }
		 
		 //streamType = 'hd';
*/
		var dataString = 'action=get_show_name&memberId=41&cache='+cache();
		var filename = 'pornstarchat.bangbros.com/legacycode/gateway.php';
		
		$.ajax({
			type: "GET",  
			url: filename,  
			data: dataString,  
			success: function(data) { 			
				 if(data != 0){
					 var streamName = data;
					 var streamSrc = 'http://kh-fms-edge5-2.isprime.com:1935/broadcast/' + streamName + '/mp4:' + streamName + '_' + streamType + '/playlist.m3u8' + "?cache=" + cache();		 
					 document.getElementById('videotag').innerHTML = '<video id="hls"  onError="onError(event);"  onLoadStart="onLoadStart();"   src="' + streamSrc + '" id="player" class="player-hls"  ></video>';
					 document.getElementById("hls").addEventListener('play', dimBack, false);		 
					 //var videoRefresh = setInterval(function(){swapVid(streamSrc + "?cache=" + cache());}, 30000);
				 }else{
				 	alert("Show not available");
				 }
			}
		});
		/*}
	});*/

    resizeVideo();


}



function swapVid(vidURL) {
	var myVideo =  document.getElementById("hls");
	myVideo.src = vidURL;
	myVideo.load();
	myVideo.play();
}