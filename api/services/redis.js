var client = {};

if(_Config.server.cluster){
    client = require('redis-url').connect(_Config.dataStore.redis.connectURI);

    client.on('connect', function(msg){
        log.info('(+) =|--- Redis Client Connected');
    });

    client.on('error', function(msg){
        log.error('Redis::Client Error: ' + msg);
    });

    client.on('failed', function(msg){
        log.error('(-)   =|--- Redis::Client Failed: ' + msg);
    });

    client.on("monitor", function (time, args) {
        log.info(time + ": " + util.inspect(args));
    });
}


module.exports = {
    pub: client,
    sub: client,
    client: client
};

