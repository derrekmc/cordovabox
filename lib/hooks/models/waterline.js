const DiskAdapter = require('sails-disk');
const Waterline = require('waterline');
let models = {};
const _ = require('lodash');

var waterline = new Waterline();
var ORM;

module.exports = {
    model: function(name, model) {
    
        var Model = Waterline.Model.extend({
            identity: name,
            datastore: 'default',
            primaryKey: 'id',
            fetchRecordsOnCreateEach: true,
            attributes: model.attributes
        });
        
        waterline.registerModel(Model);
        
        // global[name] = Model;
        //console.log(name, global[name]);
        
    },
    init: function (){
        // Instantiate a new instance of the ORM
        waterline.initialize({
            adapters: {
                'sails-disk': DiskAdapter
            },
        
            datastores: {
                default: {
                    adapter: 'sails-disk'
                }
            },
        
            defaultModelSettings: {
                primaryKey: 'id',
                datastore: 'default',
                attributes: {
                    id: { type: 'number', autoMigrations: { autoIncrement: true } },
                }
            }
        
        }, function(err, orm) {
        
            if (err) {
                console.error('Could not start up the ORM:\n', err);
                return process.exit(1);
            }
            ORM = orm;
            console.log('WORKING!!!!!', ORM);
        
        });
    
    }
    
};
