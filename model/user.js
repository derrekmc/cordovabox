var Waterline = require('waterline');
var User = Waterline.Collection.extend({

    // Define a custom table name
    tableName: 'user',

    // Set schema true/false for adapters that support schemaless
    schema: true,

    // Define an adapter to use
    adapter: 'postgresql',

    // Define attributes for this collection
    attributes: {

        firstName: {
            type: 'string',

            // also accepts any validations
            required: true
        },

        lastName: {
            type: 'string',
            required: true,
            maxLength: 20
        },

        email: {

            // Special types are allowed, they are used in validations and
            // set as a string when passed to an adapter
            type: 'email',

            required: true
        },

        age: {
            type: 'integer',
            min: 18
        },

        // You can also define instance methods here
        fullName: function() {
            return this.firstName + ' ' + this.lastName
        }
    },

    /**
     * Lifecycle Callbacks
     *
     * Run before and after various stages:
     *
     * beforeValidate
     * afterValidate
     * beforeUpdate
     * afterUpdate
     * beforeCreate
     * afterCreate
     * beforeDestroy
     * afterDestroy
     */

    beforeCreate: function(values, cb) {

        // An example encrypt function defined somewhere
        encrypt(values.password, function(err, password) {
            if(err) return cb(err);

            values.password = password;
            cb();
        });
    },

    // Class Method
    doSomething: function() {
        // Do something here
    }

});

module.exports = User;