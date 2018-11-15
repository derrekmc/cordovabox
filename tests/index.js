var assert = require('assert');
var request = require("request");
var hipchat = require('node-hipchat');

describe('CordovaBox Test Suite', function(test){

	it.skip('Test CRM Search get request with search param derrek', function(done){
		request.post({url:'https://GovExpediteddevbox-ffsdev.c9.io/search', json:true, form:{term: 'derrek', key: '!QW_PO'}}, function(err, response, body){

			assert(body.success, body.message);
			assert(body.results.length, 'No results found');
			assert(response.statusCode == 200, 'response failed did not get a response 200');
			assert(!err, 'Error: ' + err);
			assert(body, 'Request failed');
			done();

		})
	});

	it('Test Hipchat v2 integration for New Orders', function(done){

		var HC = new hipchat('77b942cc99c3803b0b5b20f6805198');

		var order = {
			id: '555a94d44a2b7f17005f8776',
			package: 'test',
			entityName: 'Tree House Inc',
			clientName: 'Pac Man',
			status: 'queued',
			created: Date.now().toString(),
			deadline: Date.now('3d')
		}

		var message  = 'Package: <strong> ' + order.package + ' </strong><br>';
		message += 'Status: <strong>' + order.status + '</strong><br>';
		message += 'Order Id: <a href="https://www.GovExpedited.com/crm/order/' + order.id + '">' + order.id + '</a><br>';
		message += 'Legal Name: <strong>' + order.entityName + '</strong><br>';
		message += 'Client Name: ' + order.clientName + '<br>';
		message += 'Created: ' + order.created + '<br>';
		message += 'Deadline: <strong>' + order.deadline + '</strong><br>';


		var params = {
			room: 1683116, // Found in the JSON response from the call above
			from: 'New Order',
			message: message,
			notify: true,
			color: 'purple'
		};

		HC.postMessage(params, function(data) {
			assert(data.status == 'sent', "Notifcation send failed.")
			done();
		});

	});

	it('Test Hipchat v2 integration for Order Updates', function(done){

		var HC = new hipchat('77b942cc99c3803b0b5b20f6805198');

		var order = {
			id: '555a94d44a2b7f17005f8776',
			package: 'test',
			entityName: 'Tree House Inc',
			clientName: 'Pac Man',
			status: 'processing',
			created: Date.now(),
			deadline: Date.now(),
			log: "Added some kool stuff",
			updatedBy: 'derrek',
			color: 'gray'
		}

		var message  = 'Package:  ' + order.package + ' <br>';
		message += 'Status: <strong>' + order.status + '</strong><br>';
		message += 'Order Id: <a href="https://www.GovExpedited.com/crm/order/' + order.id + '">' + order.id + '</a><br>';
		message += 'Legal Name: ' + order.entityName + '<br>';
		message += 'Client Name: ' + order.clientName + '<br>';
		message += 'Created: ' + order.created + '<br>';
		message += 'Deadline: ' + order.deadline + '<br>';
		message += 'Updated By: ' + order.updatedBy + '<br>';
		message += 'Log: <strong>' + order.log + '</strong><br>';

		var params = {
			room: 1717376, // Found in the JSON response from the call above
			from: 'Order Update',
			message: message,
			notify: true,
			color: 'gray'
		};

		HC.postMessage(params, function(data) {
			console.log(data)
			assert(data.status == 'sent', "Notifcation send failed.")
			done();
		});

	});

	it.skip('Test Hipchat v1 integration for orders', function(done){
		request.post({url:'https://api.hipchat.com/v1/rooms/message?auth_token=dQzc1L45r9K104XWndCywxDoBdWdBhZa0AQKhoIV', json:true, form:{room_id:10,from:'Alerts', message: 'A+new+user+signed+up'}}, function(err, response, body){
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




































	it.skip('Test', function(done){

		// you can use console.log for debugging purposes, i.e.
		// console.log('this is a debug message');

		function solution(S) {
			// write your code in JavaScript (Node.js 0.12)
			console.log(S);
			var stack = [];
			var error = null;

			try{

				for(var key in S){

					switch(S[key]){

						case "+":
							var val1 = stack.pop();
							var val2 = stack.pop();
							var result = Number(val1) + Number(val2);
							console.log("+", val1, val2, result);
							stack.push(result);
							break;

						case "*":
							var val1 = stack.pop();
							var val2 = stack.pop();
							var result = Number(val1) * Number(val2);
							console.log("*", val1, val2, result);
							stack.push(result);
							break;

						default:
							console.log("#", S[key]);
							stack.push(S[key]);
							break;

					}

				}

			}catch(e){
				console.log(e);
				error = e;
			}

			var result = (error ? -1 : Number(stack));
			return result;
		}


		var result = solution('13+62*7+*');
		console.log(Number(result));
		assert(result);
		done();

	});

	it.skip('Test ++', function(done){

		// you can use console.log for debugging purposes, i.e.
		// console.log('this is a debug message');

		function solution(S) {
			// write your code in JavaScript (Node.js 0.12)
			console.log(S);
			var stack = [];
			var error = null;

			for(var key in S){

				switch(S[key]){

					case "+":
						var val1 = stack.pop();
						var val2 = stack.pop();
						var result = Number(val1) + Number(val2);
						console.log("+", val1, val2, result);
						stack.push(result);
						break;

					case "*":
						var val1 = stack.pop();
						var val2 = stack.pop();
						var result = Number(val1) * Number(val2);
						console.log("*", val1, val2, result);
						stack.push(result);
						break;

					default:
						console.log("#", S[key]);
						stack.push(S[key]);
						break;

				}

			}

			var result = ( Number(stack) ? Number(stack) : -1);
			return result;
		}


		var result = solution('11++');
		console.log(Number(result));
		assert(result);
		done();

	});

	it.skip('Test 3', function(done){

		// you can use console.log for debugging purposes, i.e.
		// console.log('this is a debug message');

		function solution(N) {
			// write your code in JavaScript (Node.js 0.12)

			for(var i=1; i <=24 ; i++){

				if(i % 3 === 0 || i % 5 === 0 || i % 7 === 0){

					var result = "";
					if(i % 3 === 0){
						process.stdout.write('Fizz');
					}

					if(i % 5 === 0){
						process.stdout.write('Buzz');
					}

					if(i % 7 === 0){
						process.stdout.write('Wolf');
					}

					process.stdout.write('\n');

				}else{
					process.stdout.write(i + '\n');
				}
			}
		}


		var result = solution('24');

		done();

	});



















































});














































