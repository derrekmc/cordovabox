    var redis = require('redis');

    var redisHostname = (config && config.redis && config.redis.hostname) || 'localhost';
    var redisPassword = (config.redis && config.redis.password) || null;
    var redisPortNumber = (config && config.redis && config.redis.portNumber) || 6379;

    var client = redis.createClient(redisPortNumber, redisHostname, {auth_pass: redisPassword});
    var pub = redis.createClient(redisPortNumber, redisHostname, {auth_pass: redisPassword});
    var sub = redis.createClient(redisPortNumber, redisHostname, {detect_buffers: true, auth_pass: redisPassword});

    client.on('connect', function(msg){
        console.log('Redis client channel connected: ' + msg);
    });

    client.on('error', function(msg){
        console.error('Redis client channel error: ' + msg);
    });

    client.on('failed', function(msg){
        console.error('Redis client channel failed: ' + msg);
    });

    pub.on('connect', function(msg) {
        console.log('Redis publish channel connected: ' + msg);
    });

    pub.on('error', function(msg){
        console.error('Redis publish channel error: ' + msg);
    });

    pub.on('failed', function(msg){
        console.error('Redis publish channel failed: ' + msg);
    });

    sub.on('connect', function(msg){
        console.log('Redis subscription channel connected: ' + msg);
    });

    sub.on('error', function(msg){
        console.error('Redis subscription channel error: ' + msg);
    });

    sub.on('failed', function(msg){
        console.error('Redis subscription channel failed: ' + msg);
    });

module.exports = {
    pub: pub,
    sub: sub,
    client: client
};