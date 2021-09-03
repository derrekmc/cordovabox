module.exports = function isAuthenticated(req, res, next){
    /**
     * bootstrap security here for general secret key or token
     * Check session data for access here
     *
     */
    if(req.session && req.session.hasOwnProperty('isAuthenticated') && req.session.isAuthenticated){
        next();
    }else {
        //next(new Error('Session not authenticated'));
        log.debug('Http Policy Warning! - Session Not Authenticated');
        next();
    }
};