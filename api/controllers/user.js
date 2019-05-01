module.exports = {
    
    // get: function get(req, res){
    //     log.info("UserController.get");
    //     User
    //         .find({})
    //
    //         .then(function (doc){
    //             res.send(doc);
    //         })
    //         .catch(function (err) {
    //             res.send(403, err)
    //         });
    // },
    
    post: function post(req, res){
        User
            .create(req.body)
            .then(function (doc){
                res.send(201, doc._doc);
            })
            .catch(function (err) {
                res.send(403, err)
            });
    },
    
    put: function post(req, res){
        User
            .findAndModify(req.body)
            .then(function (doc){
                res.send(203, doc._doc);
            })
            .catch(function (err) {
                res.send(403, err)
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