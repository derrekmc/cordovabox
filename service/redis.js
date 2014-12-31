    var redis = require('redis');

    var redisHostname = (_Config.redis && _Config.redis.hostname) || 'localhost';
    var redisPassword = (_Config.redis && _Config.redis.password) || null;
    var redisPortNumber = (_Config && _Config.redis && _Config.redis.portNumber) || 6379;

    var client = redis.createClient(redisPortNumber, redisHostname, {auth_pass: redisPassword});
    var pub = redis.createClient(redisPortNumber, redisHostname, {auth_pass: redisPassword});
    var sub = redis.createClient(redisPortNumber, redisHostname, {detect_buffers: true, auth_pass: redisPassword});

    client.on('connect', function(msg){
        log.verbose('Redis client channel connected.');
    });

    client.on('error', function(msg){
        log.error('Redis client channel error: ' + msg);
    });

    client.on('failed', function(msg){
        log.error('Redis client channel failed: ' + msg);
    });

    pub.on('connect', function(msg) {
        log.log('Redis publish channel connected.');
    });

    pub.on('error', function(msg){
        log.error('Redis publish channel error: ' + msg);
    });

    pub.on('failed', function(msg){
        log.error('Redis publish channel failed: ' + msg);
    });

    sub.on('connect', function(msg){
        log.log('Redis subscription channel connected.');
    });

    sub.on('error', function(msg){
        log.error('Redis subscription channel error: ' + msg);
    });

    sub.on('failed', function(msg){
        log.error('Redis subscription channel failed: ' + msg);
    });

module.exports = {
    pub: pub,
    sub: sub,
    client: client
};