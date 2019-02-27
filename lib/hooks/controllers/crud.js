module.exports = {
    /**
     * Needs matching auto routes class
     * @param req
     * @param res
     */
    get: function get(req, res){
        log.info("UserController.get");
        User
            .find({})
            .exec()
            .then(function (doc){
                res.send(200, doc);
            })
            .catch(function (err) {
                res.send(403, err)
            });
    },
    
    post: function post(req, res){
        User
            .create(req.body)
            .then(function (doc){
                res.send(201, doc._doc);
            })
            .catch(function (err) {
                res.send(403, err)
            });
    }
}