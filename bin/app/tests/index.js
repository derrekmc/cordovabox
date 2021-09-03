var assert = require('assert');
var request = require("request");
var hipchat = require('node-hipchat');

describe('CordovaBox Test Suite', function(test){

	it.skip('Test Hipchat v1 integration for orders', function(done){
		request.post({url:'', json:true, form:{room_id:10,from:'Alerts', message: 'A+new+user+signed+up'}}, function(err, response, body){
			console.log('body', body)

			assert(response.statusCode == 200, 'response failed did not get a response 200');
			assert(!err, 'Error: ' + err);
			assert(body, 'Request failed');
			done();

		})
	});

	it('New Relic Custom Attributes', function(done){
		var newrelic = require('newrelic');
		var result = newrelic.addCustomParameter("orderPrice", "34");
		console.log("result:", result);
		assert(result, 'Custom attribute failed');
		done();

	});

});














































