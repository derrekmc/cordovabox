var server      = 'kh-fms-edge5-4.isprime.com/BBlive/';
var username    = 'derrekmc';
var model_name  = 'pornstar';
var security    = 30;
var member_id   = 41;
var model_id    = member_id;
var stream      = model_name + "_" + model_id;
var showType    = 1;
var debug       = 0;

var videoWidth  = 680;
var videoHeight = 382;

var so = new SWFObject("/flash/client.swf", "videoSWObject", videoWidth, videoHeight, "11");
so.addParam("wmode",            "direct");
so.addParam("scale",            "noscale");
so.addVariable("stagewidth",    "426");
so.addVariable("stageheight",   "274");
so.addVariable("ske",           "2734");
so.addVariable("stream",        stream);
so.addVariable("server",        server);
so.addVariable("modelId",       model_id);
so.addVariable("modelName",     model_name);
so.addVariable("memberId",      member_id);

so.addVariable("username",      username);
so.addVariable("userType",      security);
so.addVariable("showType",      showType);
so.addVariable("debug",         debug);
so.write("video");
