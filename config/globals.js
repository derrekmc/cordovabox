global.Redis = require('node-redis');
global.User = require('../model/user'); // todo walk the models directory and add any .js files found. For now its just user.
global._Config = require('./config');