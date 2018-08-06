var client = require('redis-url').connect(_Config.dataStore.redis.connectURI);

client.on('connect', function(msg){
    log.info('(+) =|--- Redis Client Conneced');
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

module.exports = {
    pub: client,
    sub: client,
    client: client
};


//     var redis = require('redis');
//
//     var host = _Config.redis.hostname || 'localhost';
//     var password = _Config.redis.password || null;
//     var port = _Config.redis.portNumber || 6379;
//
//     var client = redis.createClient(port, host, {
//         auth_pass: password
//     });
//
//     var publisher = redis.createClient(port, host, {
//         auth_pass: password
//     });
//
//     var subscriber = redis.createClient(port, host, {
//         detect_buffers: true,
//         auth_pass: password
//     });
//
//     client.on('connect', function(msg){
//         log.verbose('Redis client channel connected.');
//     });
//
//     client.on('error', function(msg){
//         log.error('Redis client channel error: ' + msg);
//     });
//
//     client.on('failed', function(msg){
//         log.error('Redis client channel failed: ' + msg);
//     });
//
//     publisher.on('connect', function(msg) {
//         log.log('Redis publisher channel connected.');
//     });
//
//     publisher.on('error', function(msg){
//         log.error('Redis publisher channel error: ' + msg);
//     });
//
//     publisher.on('failed', function(msg){
//         log.error('Redis publisher channel failed: ' + msg);
//     });
//
//     subscriber.on('connect', function(msg){
//         log.log('Redis subscription channel connected.');
//     });
//
//     subscriber.on('error', function(msg){
//         log.error('Redis subscription channel error: ' + msg);
//     });
//
//     subscriber.on('failed', function(msg){
//         log.error('Redis subscription channel failed: ' + msg);
//     });
//
// module.exports = {
//     pub: publisher,
//     sub: subscriber,
//     client: client
// };