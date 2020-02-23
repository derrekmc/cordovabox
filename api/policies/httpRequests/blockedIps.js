module.exports = function isBlockedIp(req, res, next){
    /**
     * bootstrap security here for general secret key or token
     * Check session data for access here
     */

    if(_Config.site.blockedIps.indexOf(req.connection.remoteAddress) != -1){
        display404(req, res, next);
    }else{
        log.debug("Authorized Ip Access");
        next();
    }
   
};

function display404(req, res){
    log.warn("!!!!!!!!!!!!!!!!!Blocked IP Accessed!!!!!!!!!!!!!!!: ");
    log.warn(req.url, req.connection.remoteAddress);
        
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('redirects/404.html', { url: req.url });
        return;
    }
    
    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }
    
    // default to plain-text. send()
    res.type('txt').send('Not found');
    res.end();
    
    return;
}