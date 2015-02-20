module.exports = {

    exec: function exec(req, res){
        res.send(User.findOne(req.param('id')));
    },

    tip: function tip(req, res){

        log.silly(User);

        var user = new User({ name: 'derrek cordova' , email: 'derrekmc@gmail.com'});

        user.update(function(err) {
            res.send(err); // Will return only the name
        });

        User.findById(user, function (err, doc) {
            log.silly(doc);
        });

    }

};