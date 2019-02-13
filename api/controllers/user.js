module.exports = {

    exec: function exec(req, res){
        log.info("working");
        User
            .find({_id:req.param('id')})
            .exec(function (err, model){
                if(err) {
                    res.send(403, err);
                } else{
                    res.send(200, model);
                }
            });
    },
    
    post: function tip(req, res){
        
        User
            .create(req.body)
            .exec(function (err, user){
                console.log("user", err, user);
                if(err) {
                    res.send(403, err);
                } else{
                    
                    user.save(function(err) {
                        if(err) {
                            res.send(403, err);
                        } else{
                            res.send(200, user);
                        }
                    });
                }
            });
        
    },

    tip: function tip(req, res){

        User
            .findByIdAndUpdate(req.param('id'), req.body, {new: true})
            .exec(function (err, user){
                console.log("user", err, user);
                if(err) {
                    res.send(403, err);
                } else{
                    user.tips += req.param('value');
                    user.save(function(err) {
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