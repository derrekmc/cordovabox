/**
 * Global Variable Configuration
 * (sails.config.globals)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.globals.html
 */
var pkg = require('../package.json');

module.exports.stats = {
    connections: 0,
    sockets:{},
    views: {},
    version: pkg.version
};
