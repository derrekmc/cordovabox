module.exports = function isRestAuthenticated(req, res, next){
    /**
     * bootstrap security here
     * Check session data for access here
     */
    next();
    /**
     * next(new Error('Api Authentication error'));
     */

};