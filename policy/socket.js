module.exports = function isSocketAuthenticated(socket, next){
    /**
     * bootstrap security here
     * Check session data for access here
     */

    if (socket.request.headers.cookie) return next();
    next(new Error('Socket Authentication error'));

};