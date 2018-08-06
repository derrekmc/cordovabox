module.exports = function trackUTM(req, res, next){
    /**
     * bootstrap security here for general secret key or token
     * Check session data for access here
     *
     */
     
    var utm = {};
     
    if(req.session){
        
        if(!req.session.utm) req.session.utm = {};
        if(!req.session.application) req.session.application = {};
        
        utm = {
            term: (req.param('utm_term') ? req.param('utm_term') : req.session.utm.term),
            medium: (req.param('utm_medium') ? req.param('utm_medium') : req.session.utm.medium),
            campaign: (req.param('utm_campaign') ? req.param('utm_campaign') : req.session.utm.campaign),
            content: (req.param('utm_content') ? req.param('utm_content') : req.session.utm.content),
            source: (req.param('utm_source') ? req.param('utm_source') : req.session.utm.source),
            network: (req.param('utm_network') ? req.param('utm_network') : req.session.utm.network),
            matchtype: (req.param('utm_matchtype') ? req.param('utm_matchtype') : req.session.utm.matchtype),
            adposition: (req.param('utm_adposition') ? req.param('utm_adposition') : req.session.utm.adposition),
            adcopy: (req.param('utm_adcopy') ? req.param('utm_adcopy') : req.session.utm.adcopy),
            placement: (req.param('utm_placement') ? req.param('utm_placement') : req.session.utm.placement),
            target: (req.param('utm_target') ? req.param('utm_target') : req.session.utm.target),
            creative: (req.param('utm_creative') ? req.param('utm_creative') : req.session.utm.creative)
        };
        
        req.session.utm = utm;
        //log.silly(utm);
        
    }
    next();
};