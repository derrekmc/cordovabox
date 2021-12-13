const DiskAdapter = require('sails-disk');
const MongoDBAdapter = require('sails-mongo');
const Waterline = require('waterline');
let models = {};
const _ = require('lodash');

let waterline = new Waterline();
let ORM;

module.exports = {
    model: function(name, model) {

        // MongoDB
        // model.attributes = _.extend(model.attributes, {
        //     id: {
        //         type: 'string',
        //         columnName: "_id"
        //     }
        // })

        // Disk adapter with auto migrate
        model.attributes = _.extend(model.attributes, {
            id: {
                type: "number",
                autoMigrations: {autoIncrement: true}
            },
        })

        // console.log(model.attributes)

        model = _.assign({
            identity: name,
            datastore: 'default',
            schema: false,
            dontUseObjectIds: false,
            primaryKey: 'id',
            fetchRecordsOnUpdate: true,
            fetchRecordsOnCreate: true,
            fetchRecordsOnCreateEach: true,
            attributes: model.attributes
        }, model)

        var Model = Waterline.Model.extend(model);

        waterline.registerModel(Model);

    },
    init: function (models, cb){
        // Instantiate a new instance of the ORM
        waterline.initialize({

            adapters: {
                'sails-disk': DiskAdapter,
                // 'sails-mongo': MongoDBAdapter
            },

            datastores: {
                default: {
                    adapter: 'sails-disk'
                },
                // mongoDB: {
                //     adapter: 'sails-mongo',
                //     url: _Config.dataStore.mongodb.connectURI
                // }
            }

        }, function(err, orm) {

            if (err) {
                console.error('Could not start up the ORM:\n', err);
                return process.exit(1);
            }
            ORM = orm;
            global.ORM = ORM;
            models.forEach(function (model) {
                global[helpers.ucFirst(model)] = ORM.collections[model];
            });

            log.info('Waterline ORM Started');
            cb();

        });

    }

};
