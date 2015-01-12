function VideoPlugin(socket, options){

    jQuery(document).ready(function () {
        var username    = 'derrekmc';
        var model_name  = 'pornstar';
        var security    = 30;
        var member_id   = 41;
        var model_id    = member_id;
        var showType    = 1;

        var so = new SWFObject(options.application.filename, options.ui.videoOut, options.application.width, options.application.height, "11");

        so.addParam("wmode",            "direct");
        so.addParam("scale",            "noscale");
        so.addVariable("stagewidth",    options.application.width);
        so.addVariable("stageheight",   options.application.height);
        so.addVariable("ske",           options.application.token);
        so.addVariable("stream",        options.application.stream);
        so.addVariable("server",        options.application.server);
        so.addVariable("modelId",       model_id);
        so.addVariable("modelName",     model_name);
        so.addVariable("memberId",      member_id);
        so.addVariable("username",      username);
        so.addVariable("userType",      security);
        so.addVariable("showType",      showType);
        so.addVariable("debug",         options.application.debug);

        so.write(options.ui.videoOut);

    });
}