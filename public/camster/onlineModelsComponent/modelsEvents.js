(function($) {

    $.fn.setOnlineModels = function(template, list) {

        var object = this;

        object.empty();
        object.loadTemplate(template, list);

        //modelTemplate = '<div class="Model Model_${id}"> <br/>${name}<img src="${img}"><div id="status"> Status:{$status}</div> </div>';



        //$.each(list, function(index, value) {
            //object.prepend("<div class='Model Model_"+ value.id +"'>"+"<br/>"+value.name+"<img src='"+value.img+"'>"+"<div id='status'> Status:"+value.status+"</div> </div>");
            //object.loadTemplate(modelTemplate, [value]);

        //});
    }

    $.fn.setModelStatus = function(template, value) {

        var obj = this.parent();

        this.remove();

        obj.loadTemplate(template, value);
    }

    $.fn.setModelSpy = function(value) {

        this.removeClass();
        this.addClass(value);

    }

    $.fn.hideModel = function() {
        this.hide();
    }

    $.fn.showModel = function() {
        this.show();
    }


}(jQuery));