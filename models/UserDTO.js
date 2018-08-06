module.exports = function DataTransmissionObject(user, options){
    if(user){
        var options = options || {};
        return _.merge(options, {
            name        : user.name,
            type        : 'user',
            action      : user.action || 'update',
            id          : user.id
        });
    }else{
        log.error('Failed to create Data Transmission Object. No socket and or user present on the socket.');
        return false;
    }
};