module.exports = function isRestAuthenticated(req, res, next){
    /**
     * bootstrap security here for general secret key or token
     * Check session data for access here
     *
     */
    if(req.session){
        next();
    }else {
        next(new Error('Authentication error'));
    }
};