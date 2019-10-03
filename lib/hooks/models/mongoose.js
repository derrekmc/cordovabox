var mongoose = require('mongoose');
var connection = mongoose.connection;
var connectionString = _Config.dataStore.mongodb.connectURI;//'mongodb://' + (_Config.dataStore.mongodb.username ? (_Config.dataStore.mongodb.username + ":" + _Config.dataStore.mongodb.password) : '' ) + '@' + _Config.dataStore.mongodb.host + ( _Config.dataStore.port ? (":" + _Config.dataStore.port) : '') + '/' + _Config.dataStore.mongodb.dbName;

mongoose.connect(connectionString);
log.info(connectionString);

connection.on('error', function(err){
    log.error("Mongo error: " + err.message);
    throw Error(err.message);
});

connection.once('open', function (callback) {
    log.info('Mongo connection open');
});

connection.once('close', function (callback) {
    log.warn('Mongo connection closed');
});

module.exports = {
    model: function(name, model) {
        /**
         * Start Mongoose Integration
         */
        let schema = new mongoose.Schema(model.attributes);
        schema.methods = model.methods;
        global[name] = mongoose.model(name, schema);
        /**
         * EndMongoose Integration
         */
    },
    init: function(){},
    client: connection
}