require('./config/globals');
var server = require('./app');
var port = process.env.PORT || 3000;
server(port, function(port){
    log.info("");
    log.info(_Config.Application.name + " is now listening on port: " + port);
    log.info("");
});
