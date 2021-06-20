
jQuery.each( [ "put", "delete" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {
        if ( jQuery.isFunction( data ) ) {
            type = type || callback;
            callback = data;
            data = undefined;
        }
        
        return jQuery.ajax({
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback
        });
    };
});

var mode = {
    live: "live",
    trigger: "trigger",
    change: "change",
    off: "off"
};

var req = {
    query: function query(ji) {
        
        var hu = window.location.search.substring(1);
        var gy = hu.split("&");
        
        for (var i=0;i<gy.length;i++) {
            var ft = gy[i].split("=");
            if (ft[0] == ji) {
                return ft[1];
            }
        }
    }
};

var querys = function addQueryVarsToForm()
{
    var vars = [], hash;
    if(window.location.href.indexOf('?') !=-1){
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        console.log(hashes);
        
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
            console.log("hash", hash[0]);
            //$('#'+hash[0]).val(hash[1]);
            $('[name="'+hash[0]+ '"]').val(hash[1] );
        }
        return vars;
    }
    
}();

$('input, label, select, option, button', 'fieldset').each(function (index, item) {
    $(this).focus(function () { $(this).closest('fieldset').addClass('fieldsetFocus'); });
    $(this).blur(function () { $(this).closest('fieldset').removeClass('fieldsetFocus'); });
});

var view = {
    transport: {
        post: $.post,
        get: $.get,
        put: $.put,
        delete: $.delete,
        on: function(model, callback){
            
        }
    }, //io.sails.connect("https://iacserver.herokuapp.com"),
    model: "document",
    /**
     * live, trigger, change
     */
    mode: mode.off,
    aimations: mode.trigger,
    debugger: true,
    version: "0.1.1",
    id: window.location.pathname.substr(window.location.pathname.lastIndexOf("/")+1)
};

if(view.id.indexOf(".") != -1){
    view.id=null;
}

console.log("Simple client v" + view.version + " initializing...");
console.log("socket mode:", view.mode);

























































/**
 * Currently supports input boxes and select boxes
 * todo support for multi select, radio options, checkboxes
 * @param data
 */
function mapDataToInputs(data){
    
    console.log("mapDataToInputs: ", data);
    
    var inputs = $('input');
    //console.log("inputs", inputs);
    $.map(inputs, function(object){
        if(data[object.name]) {
            console.log(object.name, object.value, data[object.name]);
            $('input[name="' + object.name + '"]').val(data[object.name]);
        }
        
    });
    
    var selects = $('select');
    //console.log("selects", selects);
    $.map(selects, function(object){
        //console.log(object.name, object.value, data[object.name]);
        $('select[name="' + object.name + '"]').val(data[object.name]);
    });
    
    var options = $('input[type="checkbox"]');
    console.log("checkbox", options);
    $.map(options, function(object){
        //console.log(object, object.name, object.value, data[object.name]);
        $('#'+ object.name).prop("checked");
    });
    
    var lis = $('ul');
    console.log("list", lis);
    $.map(lis, function(object){
        //console.log("/" + view.model + "/?" + $(object).attr("name") + '=' + $(object).attr("value"));
        view.transport.get("/" + view.model + "/?" + $(object).attr("name") + '=' + $(object).attr("value"), function(data){
            mapList($(object).attr("name"), $(object).attr("value"), data);
        });
    });
    
    function mapList(name, value, data){
        //console.log(name, value, data);
        $('ul[value="' + value + '"]').html("");
        $.map(data, function(object){
            $('ul[value="' + value + '"]').append("<li>" + object.name + "</li>");
        });
    }
    
}




function update (model) {
    console.log(view.model + "::on:", model);
    switch(model.verb){
        case "created":
            break;
        case "updated":
            mapDataToInputs(model.data);
            break;
        case "destroyed":
            break;
    }
}

view.transport.on(view.model, update);

function button (form) {
    //var action = $('button[type="submit"]', form).attr('href'); // this also works
    //var action = $(form).find('button[type="submit"]').attr('href');
    var action = ($(form).find('button[type="submit"]').attr('href') || $(form).attr('action') );
    console.log("form.action", action, form);
    
    if(action){
        console.log("form.action", action);
        window.location.href = action;
    }
}

function save(form){
    
    console.log(form);
    var formContent = $(form).html();
    var formToObject={};
    
    var action = $(form).attr('action');
    var method = $(form).attr('method');
    
    if(method) {
        method = method.toLowerCase();
    }else{
        console.log("No method found using default: POST");
        method = "post";
    }
    if(action) {
        action = action.toLowerCase();
    }else{
        console.log("No action found using default: /");
        action = "/";
    }
    
    var formArray = $(form).serializeArray();
    
    console.log(formArray);
    
    /**
     * Transform/Map
     * Array from: {name: "name", value: "value"} to {name: value}
     */
    formArray.map(function(object){
        var newObject = new Object();
        newObject[object.name] = object.value;
        
        console.log("object", newObject);
        return $.extend(formToObject, newObject);
    });
    
    console.log("transport", method, action, formToObject);
    
    
    /**
     * Button changes
     * @type {*|jQuery}
     */
    var btn = $(form).find("button[type='submit']");
    var buttonText = btn.html();
    btn.html(buttonText + ' <i class=" fa fa-circle-o-notch fa-spin fa-1x fa-fw "></i>');
    btn.attr('disabled', true);
    
    
    var buttonTimeout = setTimeout(function(){
        btn.removeAttr('disabled');
        btn.html(buttonText);
        $(form).html('<div class="alert alert-danger alert-dismissable "><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Form Submission Timed Out </strong></div>' + formContent);
    }.bind({form: form}), 8000);
    
    
    view.transport[method](action, formToObject, function(data, res){
        var newData = {
            data: data,
            verb: "updated"
        };
        console.log("response:", data, res);
        console.log("emulated response:", newData);
        //clearTimeout(buttonTimeout);
        update(newData);
        button(form);
    })
        .error(function(response){
            //log.error(err);
            //log.error(response.statusCode);
            //$(form).html(formContent);
            $(form).html('<div class="alert alert-danger alert-dismissable "><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>' + response.statusText + '</strong></div>' + formContent);
            
        });
    
}

var APP = {
    STATE: {
        INFO: "INFO",
        PRIMARY: "PRIMARY",
        WARNING: "WARNING",
        DANGER: "DANGER"
    }
};

function interface(form) {
    
    
    
}

switch(view.mode){
    
    case mode.live:
        $("form").on("keyup", "input", function(e){
            save(e);
        });
        break;
    case mode.change:
        $("form").on("change", function(e){
            save(e);
        });
        break;
    case mode.trigger:
        $("form").submit(function(e){
            e.preventDefault();
            
            save(this);
            
        });
        break;
    case mode.off:
    default:
        $("form").submit(function(e){
            if(view.preventDefault) {
                console.log("Simple.js client disabled. action taken preventDefault");
                e.preventDefault();
            }else{
                console.log("Simple.js client disabled. No action taken");
            }
        });
        break;
}

/**
 * Application starts here
 */
console.log("document id:", view.id);

view.transport.on("connect", function(){
    console.log("Connected");
    view.transport.get("/identify", function (data) {
        if(data && data.server == "simple") {
            console.log("done initializing simple client.");
            if(view.id) {
                view.transport.get("/" + view.model + "/" + view.id, function(data){
                    if(data == "No record found with the specified `id`.") {
                        console.error(data);
                        return;
                    }
                    mapDataToInputs(data);
                });
            }
        }else{
            view.transport.disconnect();
            console.error("Simple server not found unable to initialize simple client.");
        }
    });
    
});

/**
 * Single page not a list page
 */




