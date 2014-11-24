var config = require('config');
var io = require('socket.io-client');

function gatewayCommunicationHelper() {

};

gatewayCommunicationHelper.prototype.register = function(socket) {
    socket.on('data', function (data) {
        var actionsAllowedForGateway = [
            'blockUser',
            'getOnlineModels',
            'setModelStatus',
            'getModelStatus'
        ];
        if(data && data.cmd && actionsAllowedForGateway.indexOf(data.cmd) >= 0) {

            var socketToGateway = io.connect(config.server.gatewayUrl, {'force new connection': true});
            socketToGateway.on('connect', function () {
                console.log("socket connected to gateway");
                this.data.url = config.server.url;
                socketToGateway.emit('data', this.data);

                // disconnect from socketToGateway
                socketToGateway.disconnect();
            }.bind({data: data}));
        }
    });
};

var gch = new gatewayCommunicationHelper();
exports.register = gch.register;
