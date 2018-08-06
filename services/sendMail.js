var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(_Config.thirdParty.mandrill.key)
var moment = require('moment');

module.exports = {
    template: function template(template_name, options){
        
        var now = moment().startOf('day');
        var formatted = now.format('YYYY-MM-DD HH:mm:ss');
        
        var template_content = [{
                "name": "orderId",
                "content": options._id
            }];
            
        var message = {
            "to": [{
                    "email": options.emailTo,
                    "name": options.emailDisplayName,
                    "type": "to"
                }],
            "headers": {
                "Reply-To": options.emailReplyTo
            },
            
            "bcc_address": options.emailBcc || "admin@federalfilingservices.com",
            
            "global_merge_vars": [{
                    "name": "orderId",
                    "content": options._id
                },
                {
                    "name": "ein",
                    "content": options.applicationEin
                },
                {
                    "name": "source",
                    "content": options.applicationSource
                },
                {
                    "name": "keyword",
                    "content": options.applicationKeyword
                },
                {
                    "name": "price",
                    "content": options.orderAmount
                },
                {
                    "name": "campaign",
                    "content": options.applicationCampaign
                },
                {
                    "name": "medium",
                    "content": options.applicationMedium
                },
                {
                    "name": "package",
                    "content": options.orderPackage
                },
                {
                    "name": "product",
                    "content": options.applicationEntityType
                },
                {
                    "name": "name",
                    "content": options.name
                },
                {
                    "name": "email",
                    "content": options.email
                },
                {
                    "name": "phone",
                    "content": options.phone
                },
                {
                    "name": "message",
                    "content": options.message
                }]
                
        };
        
        var async = false;
        var send_at = formatted;
        
        mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async}, function(result) {
            log.info({"template_name": template_name, "template_content": template_content, "message": message});
            log.info(result);
        }, function(e) {
            log.error('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        });
    }
}
