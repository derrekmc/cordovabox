var socket = io.connect('http://204.236.253.144:3001');

socket.on('data', function (data) {
    var obj = eval(data);

    console.log(data);

    if (obj.cmd == 'getOnlineModelsResponse') {
        $('#models').setOnlineModels(modelTemplate, obj.list);
    }

    if (obj.cmd == 'getModelStatusResponse' || obj.cmd == 'setModelStatusResponse') {

        $('#models #' + obj.id).showModel();

        switch (obj.status.toString()) {
            case '0':
                $('#models #' + obj.id).hideModel();
                break;
            case '1':
                $('#models #' + obj.id + ' #status').setModelStatus(modelStatusTemplate, obj.status);
                $('#models #' + obj.id + ' #inSpyOverlay').setModelSpy("");
                break;
            case '2':
                $('#models #' + obj.id + ' #status').setModelStatus(modelStatusTemplate, obj.status);
                $('#models #' + obj.id + ' #inSpyOverlay').setModelSpy("inSpyOverlay");

                break;
            case '3':
                $('#models #' + obj.id + ' #status').setModelStatus(modelStatusTemplate, obj.status);
                $('#models #' + obj.id + ' #inSpyOverlay').setModelSpy("");
                break;
        }


    }
});