module.exports = function isAuthenticated(req, res, next){
    /**
     * bootstrap security here for general secret key or token
     * Check session data for access here
     *
     */
    if(req.session && req.session.isAuthenticated){
        next();
    }else {
        next(new Error('User not logged in'));
    }
};