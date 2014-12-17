module.exports = function isSocketAuthenticated(req, res, next){
    /**
     * bootstrap security here
     * Check session data for access here
     */
    next();
};