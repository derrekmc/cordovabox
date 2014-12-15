module.exports = function isAuthenticated(req, res, next){
    /**
     * bootstrap security here
     * Check session data for access here
     */
    next();
}