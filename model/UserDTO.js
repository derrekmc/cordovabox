module.exports = function DataTransmissionObject(user, options){
    if(user){
        var options = options || {};
        return _.merge(options, {
            name        : user.name,
            id          : user.id,
            type        : user.type
        });
    }else{
        console.error('Failed to create Data Transmission Object. No socket and or user present on the socket.');
        return false;
    }
}