var jwt = require('jwt-simple');

module.exports = {

    get: function exec(req, res) {

        var secret = _Config.security.jwt.public.key;
        
        // {id: , displayName: }
        var id = req.param('id');
        var value = req.param('value');
        var verified = false;
    
        /**
         * Check login credentials and then put them in a token
         * @type {String}
         */
        // User
        //     .find({_id:id})
        //     .exec()
        //     .then(function (doc){
        //      // check username
                // check password
                // token code goes here
        //     })
        //     .catch(function (err) {
        //         res.send(403, err)
        //     });
    
        /**
         * Token code
         * @type {{id: String, name: String}}
         */
        var payload = {id: id, name: value}; //'findOne: Where Id = 1 From tbl.users.name' what you get back from the database such as
        verified = true;

        // encode using HS512
        var token = jwt.encode(payload, secret, 'HS512');

        if(verified){
            log.verbose('Public access granted with token: ' + token);
            res.send(token);
        }else{
            log.error('Public access denied with token: ' + token);
            res.send(false);
        }

    },

    secure: function exec(req, res) {

        var secret = _Config.security.jwt.secure.key;

        // {id: , displayName: }
        var id = req.param('id');
        var value = req.param('value');
        var verified = false;

        /**
         * Check for the user in the data base
         * @type {{id: String, name: String}}
         */
        var payload = {id: id, name: value}; //'findOne: Where Id = 1 From tbl.users.name' what you get back from the database such as
        /**
         * If user found and has credits check to make sure set his jwt expire time to make credits.
         * @type {boolean}
         */
        verified = true;

        // encode using HS512
        var token = jwt.encode(payload, secret, 'HS512');

        if(verified){
            log.verbose('Secure access granted with token: ' + token);
            res.send(token);
        }else{
            log.error('');
            log.error('Secure access denied with token: ' + token);
            log.error('');
            res.send(false);
        }

    },
    
    verify: function exec(req, res) {
        
        var secret = _Config.security.jwt.secure.key;
        
        // {id: , displayName: }
        var id = req.param('id');
        var value = req.param('value');
        
        
        /**
         * Check for the user in the data base
         * @type {{id: String, name: String}}
         */
        var payload = req.body.token; //'findOne: Where Id = 1 From tbl.users.name' what you get back from the database such as
        /**
         * If user found and has credits check to make sure set his jwt expire time to make credits.
         * @type {boolean}
         */
        
        
        // encode using HS512
        var token = jwt.verify(payload, secret);
        
        if(token){
            log.verbose('Secure access granted with token: ' + token);
            res.send(token);
        }else{
            log.error('');
            log.error('Secure access denied with token: ' + token);
            log.error('');
            res.send(false);
        }
        
    }


};