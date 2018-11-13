var mode = {
  live: "live",
  trigger: "trigger",
  change: "change",
  off: "off"
};
var view = {
  socket: io.sails.connect("/"),
  model: "document",
  /**
   * live, trigger, change, off
   */
  mode: mode.trigger,
  preventDefault: true,
  debugger: true,
  version: "0.0.4",
  id: window.location.pathname.substr(window.location.pathname.lastIndexOf("/")+1)
};

console.log("Simple client v" + view.version + " initializing...");
console.log("socket mode:", view.mode);

























































/**
 * Currently supports input boxes and select boxes
 * todo support for multi select, radio options, checkboxes
 * @param data
 */
function mapDataToInputs(data){

  if(!data || data == undefined) return
  console.log("mapDataToInputs: ", data);

  var inputs = $('input');
  console.log(inputs);
  $.map(inputs, function(object){
    console.log(object.name, object.value, data[object.name]);
    $('input[name="' + object.name + '"]').val(data[object.name]);
  });

  var selects = $('select');
  console.log(selects);
  $.map(selects, function(object){
    console.log(object.name, object.value, data[object.name]);
    $('select[name="' + object.name + '"]').val(data[object.name]);
  });

  console.log("checkbox");
  var options = $('input[type="checkbox"]');
  console.log(options);
  $.map(options, function(object){
    console.log(object, object.name, object.value, data[object.name]);
    $('#'+ object.name).prop("checked");
  });

  var lis = $('ul');
  console.log("lis", lis);
  $.map(lis, function(object){
    console.log("/" + view.model + "/?" + $(object).attr("name") + '=' + $(object).attr("value"));
    view.socket.get("/" + view.model + "/?" + $(object).attr("name") + '=' + $(object).attr("value"), function(data){
      mapList($(object).attr("name"), $(object).attr("value"), data);
    });
  });

  function mapList(name, value, data){
    console.log(name, value, data);
    $('ul[value="' + value + '"]').html("");
    $.map(data, function(object){
      $('ul[value="' + value + '"]').append("<li>" + object.name + "</li>");
    });
  }

}


function save(form){

  console.log(form);
  var formToObject={};
  var form = $(form).serializeArray();
  console.log(form);

  /**
   * Convert To Object
   */
  form.map(function(object){
    var newObject = JSON.parse('{"' + object.name + '":"' + object.value + '"}');
    //console.log("object", newObject);
    return $.extend(formToObject, newObject);
  });

  /**
   * New functionality
   * Follow form exactly 0.1.0
   */

  // var action = $('form').attr('action');
  // var method = $('form').attr('method');
  //
  // console.log("form.action", action);
  // console.log("form.method", method);
  //
  // view.socket[method](action, formToObject, function(data){
  //   var newData = {
  //     data: data,
  //     verb: method
  //   };
  //   console.log("response:", data);
  //   console.log("emulated response:", newData);
  //   update(newData);
  //   //redirect(form);
  // });

  if(view.id){

    console.log("socket.put", "/" + view.model + "/" + view.id, formToObject);
    view.socket.put("/" + view.model + "/" + view.id, formToObject, function(data){
      var newData = {
        data: data,
        verb: "updated"
      };
      console.log("response:", data);
      console.log("emulated response:", newData);
      update(newData);
      //action(form);
    });
  }else{
    console.log("socket.post", "/" + view.model, formToObject);
    view.socket.post("/" + view.model, formToObject, function(data){
      var newData = {
        data: data,
        verb: "create"
      };
      console.log("response:", data);
      console.log("emulated response:", newData);
      update(newData);
      action(form);
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

function action (form) {
  var action = $('form').attr('action');
  var method = $('form').attr('method');
  console.log("form.action", action);
  console.log("form.method", method);
  window.location.href=action;
}

view.socket.on(view.model, update);

switch(view.mode){
  case mode.live:
    $("form").on("keyup", "input", function(e){
      save(e);
    });
  case mode.change:
    $("form").on("change", function(e){
      save(e);
    });
  case mode.trigger:
    $("form").submit(function(e){
      e.preventDefault();
      save(this);
    });
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

view.socket.on("connect", function(){
  if(view.mode == "off") {
    console.log("Simple client disabled by user. View mode set to:", view.mode);
    return;
  }
  view.socket.get("/identify", function (data, jwres) {
    //console.log("identify", data, jwres);
    if(data && data.server == "simple") {
      console.log("Connected to simple server v" + data.version);
      console.log("done initializing simple client.");
      if(view.id) view.socket.get("/" + view.model + "/" + view.id, function(data){

        if(data == "No record found with the specified `id`.") {
          console.log(data);
          //return;
        }
        mapDataToInputs(data);
      });
    }else{
      view.socket.disconnect();
      console.error("Simple server not found unable to initialize simple client.");
    }
  });

});

/**
 * Single page not a list page
 */




