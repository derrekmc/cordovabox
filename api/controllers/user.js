module.exports = {

    exec: function exec(req, res){
        User
            .find({id:req.param('id')})
            .exec(function (err, model){
                if(err) {
                    res.send(403, err);
                } else{
                    res.send(200, model);
                }
            });
    },

    tip: function tip(req, res){

        User
            .find({id: req.param('id')})
            .exec(function (err, user){
                if(err) {
                    res.send(403, err);
                } else{
                    user.tips += req.param('value');
                    user.update(function(err) {
                        if(err) {
                            res.send(403, err);
                        } else{
                            res.send(200, user);
                        }
                    });
                }
            });

    }

};