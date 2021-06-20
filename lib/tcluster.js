/**
 * New relic stats
 */
//global.newrelic = require('newrelic');

var throng = require('throng');
require('./lib/globals');

var WORKERS = process.env.WEB_CONCURRENCY || Math.floor(require('os').cpus().length * (parseFloat(_Config.server.process.max_spawn || 1) / 100.0));

throng(start, {
	workers: WORKERS,
	lifetime: Infinity
});

async function start() {
	require('./app')(process.env.PORT || 3000, function(port){
		log.info("A worker is now listening on port:" + port);
	});
}




