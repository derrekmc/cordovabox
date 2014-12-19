var server = require('./app');
var port = process.env.PORT || 3000;
server(port, function(port){
    log.info("Server is now listening on port: " + port);
});
