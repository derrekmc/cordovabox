module.exports = function RoomDataTransmissionObject(room, options){
    if(room){
        var options = options || {};
        return _.merge(options, {
            name        : room.name,
            type        : 'room',
            action      : room.action || 'update',
            status      : room.status,

            tips        : room.tips,
            tipGoal     : room.tipGoal,
            tipTopic    : room.tipTopic
        });
    }else{
        log.error('Failed to create Data Transmission Object. No socket and or user present on the socket.');
        return false;
    }
};